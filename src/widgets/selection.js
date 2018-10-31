/**
 * Copyright (c) 2018-present, Weiye Sun.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import React, {Component} from 'react';
import Select from 'react-select';

const extractArrayFieldSelectedOptions = (values, items, isMultiSelection) => {
    if(!values || values.length === 0) {
        return isMultiSelection ? [] : '';
    }

    if(!isMultiSelection) {
        let value = values[0],
            selectedValueIndex = items.enum.indexOf(value);

        return selectedValueIndex < 0 ? '' : {
            value: value,
            label: items.enumNames ? items.enumNames[selectedValueIndex] : value
        };
    }

    let selectedOptions = new Array(values.length),
        i = 0;

    for(let value of values) {
        let selectedValueIndex = items.enum.indexOf(value);
        if(selectedValueIndex >= 0) {
            selectedOptions[i++] = {
                value: value,
                label: items.enumNames ? items.enumNames[selectedValueIndex] : value
            }
        }
    }

    return selectedOptions;
};

const extractPrimitiveFieldSelectedOption = (value, enums, enumNames) => {
    if(value === undefined || value === null) {
        return '';
    }

    let selectedValueIndex = enums.indexOf(value);
    return selectedValueIndex < 0 ? '' : {
        value: value,
        label: enumNames ? enumNames[selectedValueIndex] : value
    };
};

const getSelectionStateObject = (props) => {
    let selectionOptions;

    if(props.multiple) {                    // This is an array field
        let isMultiSelection;
        try {
            isMultiSelection = props.options.select.multi;
        } catch (e) {
            // The multiple settings for react selection is not set. The react selection is in single selection mode
            isMultiSelection = false;
        }

        selectionOptions = extractArrayFieldSelectedOptions(props.value, props.schema.items, isMultiSelection);
    } else {
        selectionOptions = extractPrimitiveFieldSelectedOption(props.value, props.schema.enum, props.schema.enumNames);
    }

    return {
        value: props.value,
        selectedOptions: selectionOptions,
        enumOptions: props.options.enumOptions
    };
};

class Selection extends Component {
    static getDerivedStateFromProps(props, state) {
        let optionsLength = props.options.enumOptions.length;

        if(optionsLength !== state.enumOptions.length) {
            return getSelectionStateObject(props);
        }

        for (let i = 0; i < optionsLength; i++) {
            if(props.options.enumOptions[i].value !== state.enumOptions[i].value) {
                return getSelectionStateObject(props);
            }
        }

        return props.value === state.value ? state : getSelectionStateObject(props);
    }

    constructor(props) {
        super(props);

        let getSelectedValueMethodName = '',
            isMultiSelection;

        try {
            isMultiSelection = props.options.select.multi;
        } catch (e) {
            // The multiple settings for react selection is not set. The react selection is in single selection mode
            isMultiSelection = false;
        }

        if(props.multiple) {
            getSelectedValueMethodName = isMultiSelection ? '_getFieldSelectedOptions' : '_getArrayFieldSelectedOption';
        } else {
            if(isMultiSelection) {
                throw new Error('Can not use multi selection for primitive field type for field with id: ' + props.id);
            }
            getSelectedValueMethodName = '_getPrimitiveFieldSelectedOption'
        }

        this.state = getSelectionStateObject(props);
        this.state.valueMethodName = getSelectedValueMethodName;
    }

    /**
     * The field is set as string, number or other primitive types.
     * The selection is set for single selection
     *
     * @param selectedOption
     * @returns {string}
     * @private
     */
    _getPrimitiveFieldSelectedOption = (selectedOption) => {
        return selectedOption ? selectedOption.value : undefined;
    };

    /**
     * The field is set as an array type.
     * The selection is set for single selection
     *
     * @private
     */
    _getArrayFieldSelectedOption = (selectedOption) => {
        return selectedOption ? [selectedOption.value] : [];
    };

    /**
     * The field is set as an array type.
     * The selection is set for multi selection
     *
     * @private
     */
    _getFieldSelectedOptions = (selectedOptions) => {
        return selectedOptions.map((selectedOption) => selectedOption.value);
    };

    _handleChange = (selectedOptions) => {
        let selectedOptionValue = this[this.state.valueMethodName](selectedOptions);
        this.props.onChange(selectedOptionValue);
        this.setState({
            value: selectedOptionValue,
            selectedOptions: selectedOptions
        });
    };

    render() {
        const {autofocus, multiple, schema, value, options, ...otherProps} = this.props;

        let selectOptionsValues = multiple ? schema.items.enum : schema.enum,
            selectOptionsLabels = multiple ?
                (schema.items.enumNames ? schema.items.enumNames : schema.items.enum) :
                (schema.enumNames ? schema.enumNames : schema.enum),
            selectOptions = selectOptionsValues.map((value, index) => {return {value: value, label: selectOptionsLabels[index]}}),
            selectProps = {...otherProps, ...options.select};

        return (
            <Select {...selectProps}
                className={(selectProps.className ? selectProps.className + ' ' : '') + 'selection--' + this.props.id}
                autoFocus={autofocus}
                value={this.state.selectedOptions}
                onChange={this._handleChange}
                options={selectOptions}
            />
        );
    }
}

export default Selection;
