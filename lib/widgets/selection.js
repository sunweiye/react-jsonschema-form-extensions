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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var extractArrayFieldSelectedOptions = function extractArrayFieldSelectedOptions(values, items, isMultiSelection) {
    if (!values || values.length === 0) {
        return isMultiSelection ? [] : '';
    }

    if (!isMultiSelection) {
        var value = values[0],
            selectedValueIndex = items.enum.indexOf(value);

        return selectedValueIndex < 0 ? '' : {
            value: value,
            label: items.enumNames ? items.enumNames[selectedValueIndex] : value
        };
    }

    var selectedOptions = new Array(values.length),
        i = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _value = _step.value;

            var _selectedValueIndex = items.enum.indexOf(_value);
            if (_selectedValueIndex >= 0) {
                selectedOptions[i++] = {
                    value: _value,
                    label: items.enumNames ? items.enumNames[_selectedValueIndex] : _value
                };
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return selectedOptions;
};

var extractPrimitiveFieldSelectedOption = function extractPrimitiveFieldSelectedOption(value, enums, enumNames) {
    if (value === undefined || value === null) {
        return '';
    }

    var selectedValueIndex = enums.indexOf(value);
    return selectedValueIndex < 0 ? '' : {
        value: value,
        label: enumNames ? enumNames[selectedValueIndex] : value
    };
};

var getSelectionStateObject = function getSelectionStateObject(props) {
    var selectionOptions = void 0;

    if (props.multiple) {
        // This is an array field
        var isMultiSelection = void 0;
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
        selectedOptions: selectionOptions
    };
};

var Selection = function (_Component) {
    _inherits(Selection, _Component);

    _createClass(Selection, null, [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
            return props.value === state.value ? state : getSelectionStateObject(props);
        }
    }]);

    function Selection(props) {
        _classCallCheck(this, Selection);

        var _this = _possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).call(this, props));

        _this._getPrimitiveFieldSelectedOption = function (selectedOption) {
            return selectedOption ? selectedOption.value : undefined;
        };

        _this._getArrayFieldSelectedOption = function (selectedOption) {
            return selectedOption ? [selectedOption.value] : [];
        };

        _this._getFieldSelectedOptions = function (selectedOptions) {
            return selectedOptions.map(function (selectedOption) {
                return selectedOption.value;
            });
        };

        _this._handleChange = function (selectedOptions) {
            var selectedOptionValue = _this[_this.state.valueMethodName](selectedOptions);
            _this.props.onChange(selectedOptionValue);
            _this.setState({
                value: selectedOptionValue,
                selectedOptions: selectedOptions
            });
        };

        var getSelectedValueMethodName = '',
            isMultiSelection = void 0;

        try {
            isMultiSelection = props.options.select.multi;
        } catch (e) {
            // The multiple settings for react selection is not set. The react selection is in single selection mode
            isMultiSelection = false;
        }

        if (props.multiple) {
            getSelectedValueMethodName = isMultiSelection ? '_getFieldSelectedOptions' : '_getArrayFieldSelectedOption';
        } else {
            if (isMultiSelection) {
                throw new Error('Can not use multi selection for primitive field type for field with id: ' + props.id);
            }
            getSelectedValueMethodName = '_getPrimitiveFieldSelectedOption';
        }

        _this.state = getSelectionStateObject(props);
        _this.state.valueMethodName = getSelectedValueMethodName;
        return _this;
    }

    /**
     * The field is set as string, number or other primitive types.
     * The selection is set for single selection
     *
     * @param selectedOption
     * @returns {string}
     * @private
     */


    /**
     * The field is set as an array type.
     * The selection is set for single selection
     *
     * @private
     */


    /**
     * The field is set as an array type.
     * The selection is set for multi selection
     *
     * @private
     */


    _createClass(Selection, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                autofocus = _props.autofocus,
                multiple = _props.multiple,
                schema = _props.schema,
                value = _props.value,
                options = _props.options,
                otherProps = _objectWithoutProperties(_props, ['autofocus', 'multiple', 'schema', 'value', 'options']);

            var selectOptionsValues = multiple ? schema.items.enum : schema.enum,
                selectOptionsLabels = multiple ? schema.items.enumNames ? schema.items.enumNames : schema.items.enum : schema.enumNames ? schema.enumNames : schema.enum,
                selectOptions = selectOptionsValues.map(function (value, index) {
                return { value: value, label: selectOptionsLabels[index] };
            }),
                selectProps = _extends({}, otherProps, options.select);

            return _react2.default.createElement(_reactSelect2.default, _extends({}, selectProps, {
                className: (selectProps.className ? selectProps.className + ' ' : '') + 'selection--' + this.props.id,
                autoFocus: autofocus,
                value: this.state.selectedOptions,
                onChange: this._handleChange,
                options: selectOptions
            }));
        }
    }]);

    return Selection;
}(_react.Component);

exports.default = Selection;