import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-jsonschema-form';
import {ReactSelection, ReactAutoComplete} from '../lib';
import css from './example.css';

let FormExtensions = {
    ReactSelection,
    ReactAutoComplete
};

const registrationForm = require('./forms/registrationForm');

const renderFilterList = () => {
    ReactDOM.render(<Form {...registrationForm} widgets={FormExtensions} onSubmit={({formData}) => console.log(formData) }/>, document.getElementById('form-app'));

};

renderFilterList();
