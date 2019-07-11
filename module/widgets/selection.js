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
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      if (!_iteratorNormalCompletion && _iterator.return != null) {
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
  var selectionOptions;

  if (props.multiple) {
    // This is an array field
    var isMultiSelection;

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

var Selection =
/*#__PURE__*/
function (_Component) {
  _inherits(Selection, _Component);

  _createClass(Selection, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var optionsLength = props.options.enumOptions.length;

      if (optionsLength !== state.enumOptions.length) {
        return getSelectionStateObject(props);
      }

      for (var i = 0; i < optionsLength; i++) {
        if (props.options.enumOptions[i].value !== state.enumOptions[i].value) {
          return getSelectionStateObject(props);
        }
      }

      return props.value === state.value ? state : getSelectionStateObject(props);
    }
  }]);

  function Selection(props) {
    var _this;

    _classCallCheck(this, Selection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Selection).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_getPrimitiveFieldSelectedOption", function (selectedOption) {
      return selectedOption ? selectedOption.value : undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "_getArrayFieldSelectedOption", function (selectedOption) {
      return selectedOption ? [selectedOption.value] : [];
    });

    _defineProperty(_assertThisInitialized(_this), "_getFieldSelectedOptions", function (selectedOptions) {
      return selectedOptions.map(function (selectedOption) {
        return selectedOption.value;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function (selectedOptions) {
      var selectedOptionValue = _this[_this.state.valueMethodName](selectedOptions);

      _this.props.onChange(selectedOptionValue);

      _this.setState({
        value: selectedOptionValue,
        selectedOptions: selectedOptions
      });
    });

    var getSelectedValueMethodName = '',
        isMultiSelection;

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


  _createClass(Selection, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          autofocus = _this$props.autofocus,
          multiple = _this$props.multiple,
          schema = _this$props.schema,
          value = _this$props.value,
          options = _this$props.options,
          otherProps = _objectWithoutProperties(_this$props, ["autofocus", "multiple", "schema", "value", "options"]);

      var selectOptionsValues = multiple ? schema.items.enum : schema.enum,
          selectOptionsLabels = multiple ? schema.items.enumNames ? schema.items.enumNames : schema.items.enum : schema.enumNames ? schema.enumNames : schema.enum,
          selectOptions = selectOptionsValues.map(function (value, index) {
        return {
          value: value,
          label: selectOptionsLabels[index]
        };
      }),
          selectProps = _objectSpread({}, otherProps, {}, options.select);

      return _react.default.createElement(_reactSelect.default, _extends({}, selectProps, {
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

var _default = Selection;
exports.default = _default;