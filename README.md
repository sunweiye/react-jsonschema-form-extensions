react-jsonschema-form-extensions
============

A collection of widgets and fields for [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form) project

---

# Installation

At this moment, the project is still under development, more widgets and fields are planed to add into this project.
Therefore, the project is not published to [npm](https://www.npmjs.com/). But it can be install from github repository:

    npm install https://github.com/sunweiye/react-jsonschema-form-extensions.git

## Widgets
The widgets include:

### react-selection
An UI widget for the form with [react-select](https://github.com/JedWatson/react-select)
##### Usage

```jsx
import {ReactSelection} from 'react-jsonschema-form-extensions';
uiShema["ui:widget"] = (props) => <ReactSelection {...props} />
```

### react-auto-complete
An UI widget for the form with [react-autocomplete](https://github.com/reactjs/react-autocomplete)
##### Usage
The auto complete can be used with static data and async loader

```jsx
import {ReactAutoComplete} from 'react-jsonschema-form-extensions';
uiShema["ui:widget"] = (props) => <ReactAutoComplete {...props} />
```

# License

MIT Licensed. Copyright (c) 2018-present, Weiye Sun.
