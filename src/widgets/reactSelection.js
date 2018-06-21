/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import React, {Component} from 'react';
import Select from 'react-select';

class ReactSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            selectedOption: ''
        }
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
        const { selectedOption } = this.state;
        const {autofocus, schema, uiSchema, value, ...otherProps} = this.props;

        let selectOptionsValues = schema.enum,
            selectOptionsLabels = schema.enumNames ? schema.enumNames : schema.enum,
            selectOptions = selectOptionsValues.map((value, index) => {return {value: value, label: selectOptionsLabels[index]}});

        return (
            <Select {...otherProps}
                autoFocus={autofocus}
                value={selectedOption}
                onChange={this._handleChange}
                options={selectOptions}
            />
        );
    }
}

ReactSelection.defaultProps = {
};

ReactSelection.propsTypes = {
};

export default ReactSelection;
