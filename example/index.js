import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-jsonschema-form';
import {ReactSelection} from '../lib';

const registrationForm = require('./forms/registrationForm');

registrationForm.uiSchema.language['ui:widget'] = (props) => <ReactSelection {...props} />

const renderFilterList = () => {
    ReactDOM.render(<Form {...registrationForm}/>, document.getElementById('form-app'));

};

renderFilterList();
