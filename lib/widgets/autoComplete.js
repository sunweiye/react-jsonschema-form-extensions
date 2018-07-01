/**
 * Copyright (c) 2018-present, Weiye Sun.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAutocomplete = require('react-autocomplete');

var _reactAutocomplete2 = _interopRequireDefault(_reactAutocomplete);

var _loader = require('../ulity/loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getValueFromItem = function getValueFromItem(item) {
    var propertyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

    switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
        case 'object':
            var propertyKey = item.hasOwnProperty(propertyName) ? propertyName : Object.keys(item)[0];
            return item[propertyKey];
        case 'function':
            return item();
        default:
            return item;
    }
};

var renderItemByDefault = function renderItemByDefault(item, isHighlighted, styles) {
    var itemName = getValueFromItem(item, 'name');

    return _react2.default.createElement(
        'div',
        { key: itemName,
            className: isHighlighted ? 'item-highlighted' : '',
            style: styles },
        itemName
    );
};

var matchItemToValue = function matchItemToValue(item, value) {
    return getValueFromItem(item).toLowerCase().indexOf(value.toLowerCase()) !== -1;
};

var buildItemsFromResponse = function buildItemsFromResponse(data, valueKey, labelKey, currentValue) {
    if (!Array.isArray(data)) {
        data = [data];
    }

    var results = [];
    currentValue = currentValue.toLowerCase();

    for (var i = 0; i < data.length; i++) {
        var item = data[i],
            value = void 0,
            label = void 0;
        if (valueKey && item.hasOwnProperty(valueKey)) {
            value = item[valueKey];
        } else {
            valueKey = Object.keys(item)[0];
            value = item[valueKey];
        }

        if (value.toLowerCase().indexOf(currentValue) !== -1) {
            if (labelKey && item.hasOwnProperty(labelKey)) {
                label = item[labelKey];
            } else {
                labelKey = valueKey;
                label = item[labelKey];
            }
            results.push({ name: label, value: value });
        }
    }

    return results;
};

var loadItemsFromRemote = function loadItemsFromRemote(url, request, valueKey, labelKey, currentValue) {
    return (0, _loader.loadDataFromRemote)(url, request).then(function (data) {
        return buildItemsFromResponse(data, valueKey, labelKey, currentValue);
    });
};

var AutoComplete = function (_Component) {
    _inherits(AutoComplete, _Component);

    _createClass(AutoComplete, null, [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
            return props.value === state.value ? state : props.value;
        }
    }]);

    function AutoComplete(props) {
        _classCallCheck(this, AutoComplete);

        var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this, props));

        _initialiseProps.call(_this);

        var _this$props = _this.props,
            autofocus = _this$props.autofocus,
            schema = _this$props.schema,
            value = _this$props.value,
            options = _this$props.options,
            asyncLoad = _this$props.asyncLoad,
            otherProps = _objectWithoutProperties(_this$props, ['autofocus', 'schema', 'value', 'options', 'asyncLoad']);

        var _options$autoComplete = options.autoComplete,
            async = _options$autoComplete.async,
            autoCompleteOptions = _objectWithoutProperties(_options$autoComplete, ['async']);

        var autoCompleteSettings = _extends({ autoFocus: autofocus }, otherProps, autoCompleteOptions);

        if (asyncLoad) {
            _this.asyncLoader = asyncLoad;
        } else {
            var asyncLoaderConfig = _this._getAsyncConfig(async);
            asyncLoaderConfig ? _this.asyncLoader = loadItemsFromRemote.bind('', asyncLoaderConfig.url, asyncLoaderConfig.request, asyncLoaderConfig.valueKey, asyncLoaderConfig.labelKey) : autoCompleteSettings.shouldItemRender = matchItemToValue;
        }

        if (autoCompleteSettings.inputProps) {
            autoCompleteSettings.inputProps.className = autoCompleteSettings.inputProps.className ? autoCompleteSettings.inputProps.className + ' form-control' : 'form-control';
        } else {
            autoCompleteSettings.inputProps = {
                className: 'form-control'
            };
        }

        if (!autoCompleteSettings.wrapperStyle) {
            autoCompleteSettings.wrapperStyle = {};
        }

        var items = autoCompleteSettings.items,
            autoCompleteProps = _objectWithoutProperties(autoCompleteSettings, ['items']);

        _this.autoCompleteProps = autoCompleteProps;

        _this.state = {
            value: value,
            items: items
        };
        return _this;
    }

    _createClass(AutoComplete, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                value = _state.value,
                items = _state.items;

            return _react2.default.createElement(_reactAutocomplete2.default, _extends({}, this.autoCompleteProps, {
                autoHighlight: true,
                value: value,
                items: items,
                onChange: function onChange(event, value) {
                    return _this2._handleChange(value);
                },
                onSelect: this._handleChange
            }));
        }
    }]);

    return AutoComplete;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this._handleChange = function (value) {
        _this3.props.onChange(value);
        if (_this3.asyncLoader) {
            _this3.asyncLoader(value).then(function (items) {
                return _this3.setState({
                    value: value,
                    items: items
                });
            });
        } else {
            _this3.setState({
                value: value
            });
        }
    };

    this._getAsyncConfig = function (asyncConfig) {
        var config = {
            url: '',
            request: null,
            valueKey: null,
            labelKey: null
        };

        switch (typeof asyncConfig === 'undefined' ? 'undefined' : _typeof(asyncConfig)) {
            case "string":
                config.url = asyncConfig;
                break;
            case "object":
                for (var key in config) {
                    config[key] = asyncConfig[key];
                }
                break;
            default:
                return false;
        }

        return config;
    };
};

AutoComplete.defaultProps = {
    items: [],
    getItemValue: getValueFromItem,
    renderItem: renderItemByDefault
};

AutoComplete.prototypes = {
    items: _propTypes2.default.array,
    getItemValue: _propTypes2.default.func,
    renderItem: _propTypes2.default.func,
    asyncLoad: _propTypes2.default.func
};

exports.default = AutoComplete;