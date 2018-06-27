/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import React, {Component} from 'react';
import Select from 'react-select';

const getSelectionStateObject = (props) => {
    let labelText = '';
    if(props.value) {
        if(props.schema.enumNames) {
            labelText = props.schema.enumNames[props.schema.enum.indexOf(props.value)];
        } else {
            labelText = props.value;
        }
    }

    return {
        value: props.value,
        selectedOption: props.value ? {value: props, label: labelText} : ''
    };
};

class ReactSelection extends Component {
    static getDerivedStateFromProps(props, state) {
        return props.value === state.value ? state : getSelectionStateObject(props);
    }

    constructor(props) {
        super(props);
        this.state = getSelectionStateObject(props);
    }

    _handleChange = (selectedOption) => {
        let selectedOptionValue = selectedOption ? selectedOption.value : '';
        this.props.onChange(selectedOptionValue);
        this.setState({
            value: selectedOptionValue,
            selectedOption: selectedOption
        });
    };

    render() {
        const {autofocus, schema, uiSchema, value, ...otherProps} = this.props;

        let selectOptionsValues = schema.enum,
            selectOptionsLabels = schema.enumNames ? schema.enumNames : schema.enum,
            selectOptions = selectOptionsValues.map((value, index) => {return {value: value, label: selectOptionsLabels[index]}}),
            selectProps = {...otherProps, ...this.props.options.select};

        return (
            <Select {...selectProps}
                className={(selectProps.className ? selectProps.className + ' ' : '') + 'selection--' + this.props.id}
                autoFocus={autofocus}
                value={this.state.selectedOption}
                onChange={this._handleChange}
                options={selectOptions}
            />
        );
    }
}

export default ReactSelection;
