/**
 * Copyright (c) 2013-present, Facebook, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactSelection = function (_Component) {
    _inherits(ReactSelection, _Component);

    function ReactSelection(props) {
        _classCallCheck(this, ReactSelection);

        var _this = _possibleConstructorReturn(this, (ReactSelection.__proto__ || Object.getPrototypeOf(ReactSelection)).call(this, props));

        _this._handleChange = function (selectedOption) {
            var selectedOptionValue = selectedOption ? selectedOption.value : '';
            _this.props.onChange(selectedOptionValue);
            _this.setState({
                value: selectedOptionValue,
                selectedOption: selectedOption
            });
        };

        _this.state = {
            value: _this.props.value,
            selectedOption: ''
        };
        return _this;
    }

    _createClass(ReactSelection, [{
        key: 'render',
        value: function render() {
            var selectedOption = this.state.selectedOption;

            var _props = this.props,
                autofocus = _props.autofocus,
                schema = _props.schema,
                uiSchema = _props.uiSchema,
                value = _props.value,
                otherProps = _objectWithoutProperties(_props, ['autofocus', 'schema', 'uiSchema', 'value']);

            var selectOptionsValues = schema.enum,
                selectOptionsLabels = schema.enumNames ? schema.enumNames : schema.enum,
                selectOptions = selectOptionsValues.map(function (value, index) {
                return { value: value, label: selectOptionsLabels[index] };
            });

            return _react2.default.createElement(_reactSelect2.default, _extends({}, otherProps, {
                autoFocus: autofocus,
                value: selectedOption,
                onChange: this._handleChange,
                options: selectOptions
            }));
        }
    }]);

    return ReactSelection;
}(_react.Component);

ReactSelection.defaultProps = {};

ReactSelection.propsTypes = {};

exports.default = ReactSelection;