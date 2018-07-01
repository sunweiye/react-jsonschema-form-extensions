/**
 * Copyright (c) 2018-present, Weiye Sun.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import React, {Component} from 'react';
import PropTypes from "prop-types";
import Autocomplete from 'react-autocomplete';
import {loadDataFromRemote} from '../ulity/loader';

const getValueFromItem = (item, propertyName = 'value') => {
    switch (typeof item) {
        case 'object':
            let propertyKey = item.hasOwnProperty(propertyName) ? propertyName : Object.keys(item)[0];
            return item[propertyKey];
        case 'function':
            return item();
        default:
            return item;
    }
};

const renderItemByDefault = (item, isHighlighted, styles) => {
    let itemName = getValueFromItem(item, 'name');

    return (
        <div key={itemName}
             className={isHighlighted ? 'item-highlighted' : ''}
             style={styles} >{itemName}</div>);
};

const matchItemToValue = (item, value) => {
    return getValueFromItem(item).toLowerCase().indexOf(value.toLowerCase()) !== -1;
};

const buildItemsFromResponse = (data, valueKey, labelKey, currentValue) => {
    if(!Array.isArray(data)) {
        data = [data];
    }

    let results = [];
    currentValue = currentValue.toLowerCase();

    for(let i = 0; i < data.length; i++) {
        let item = data[i],
            value,
            label;
        if(valueKey && item.hasOwnProperty(valueKey)) {
            value = item[valueKey];
        } else {
            valueKey = Object.keys(item)[0];
            value = item[valueKey];
        }

        if(value.toLowerCase().indexOf(currentValue) !== -1) {
            if(labelKey && item.hasOwnProperty(labelKey)) {
                label = item[labelKey];
            } else {
                labelKey = valueKey;
                label = item[labelKey];
            }
            results.push({name: label, value: value});
        }
    }

    return results;
};

const loadItemsFromRemote = (url, request, valueKey, labelKey, currentValue) => {
    return loadDataFromRemote(url, request).then((data) => buildItemsFromResponse(data, valueKey, labelKey, currentValue));
};

class AutoComplete extends Component {
    static getDerivedStateFromProps(props, state) {
        return props.value === state.value ? state : props.value;
    }

    constructor(props) {
        super(props);
        const {autofocus, schema, value, options, asyncLoad, ...otherProps} = this.props;
        const {async, ...autoCompleteOptions} = options.autoComplete;

        let autoCompleteSettings = {autoFocus:autofocus, ...otherProps, ...autoCompleteOptions};

        if(asyncLoad) {
            this.asyncLoader = asyncLoad;
        } else {
            let asyncLoaderConfig = this._getAsyncConfig(async);
            asyncLoaderConfig ?
                this.asyncLoader = loadItemsFromRemote.bind('', asyncLoaderConfig.url, asyncLoaderConfig.request, asyncLoaderConfig.valueKey, asyncLoaderConfig.labelKey) :
                autoCompleteSettings.shouldItemRender = matchItemToValue;
        }

        if(autoCompleteSettings.inputProps) {
            autoCompleteSettings.inputProps.className =
                autoCompleteSettings.inputProps.className ?
                    autoCompleteSettings.inputProps.className + ' form-control' :
                    'form-control';
        } else {
            autoCompleteSettings.inputProps = {
                className: 'form-control'
            }
        }

        if(!autoCompleteSettings.wrapperStyle) {
            autoCompleteSettings.wrapperStyle = {};
        }

        const {items, ...autoCompleteProps} = autoCompleteSettings;
        this.autoCompleteProps = autoCompleteProps;

        this.state = {
            value: value,
            items: items
        }
    }

    _handleChange = (value) => {
        this.props.onChange(value);
        if(this.asyncLoader) {
            this.asyncLoader(value).then((items) => this.setState({
                value: value,
                items: items
            }));
        } else {
            this.setState({
                value: value
            });
        }
    };

    _getAsyncConfig = (asyncConfig) => {
        let config = {
            url: '',
            request: null,
            valueKey: null,
            labelKey: null
        };

        switch (typeof asyncConfig) {
            case "string":
                config.url = asyncConfig;
                break;
            case "object":
                for(let key in config) {
                    config[key] = asyncConfig[key];
                }
                break;
            default:
                return false;
        }

        return config;
    };

    render() {
        const {value, items} = this.state;
        return <Autocomplete
            {...this.autoCompleteProps}
            autoHighlight={true}
            value={value}
            items={items}
            onChange={(event, value) => this._handleChange(value)}
            onSelect={this._handleChange}
        />;
    }
}

AutoComplete.defaultProps = {
    items: [],
    getItemValue: getValueFromItem,
    renderItem: renderItemByDefault
};

AutoComplete.prototypes = {
    items: PropTypes.array,
    getItemValue: PropTypes.func,
    renderItem: PropTypes.func,
    asyncLoad: PropTypes.func
};

export default AutoComplete;
