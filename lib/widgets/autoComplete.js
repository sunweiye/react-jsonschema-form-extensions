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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactAutocomplete = _interopRequireDefault(require("react-autocomplete"));

var _loader = require("../ulity/loader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getValueFromItem = function getValueFromItem(item) {
  var propertyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';

  switch (_typeof(item)) {
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
  return _react.default.createElement("div", {
    key: itemName,
    className: isHighlighted ? 'item-highlighted' : '',
    style: styles
  }, itemName);
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

      results.push({
        name: label,
        value: value
      });
    }
  }

  return results;
};

var loadItemsFromRemote = function loadItemsFromRemote(url, request, valueKey, labelKey, currentValue) {
  return (0, _loader.loadDataFromRemote)(url, request).then(function (data) {
    return buildItemsFromResponse(data, valueKey, labelKey, currentValue);
  });
};

var AutoComplete =
/*#__PURE__*/
function (_Component) {
  _inherits(AutoComplete, _Component);

  _createClass(AutoComplete, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return props.value === state.value ? state : props.value;
    }
  }]);

  function AutoComplete(props) {
    var _this;

    _classCallCheck(this, AutoComplete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoComplete).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange(value);

      if (_this.asyncLoader) {
        _this.asyncLoader(value).then(function (items) {
          return _this.setState({
            value: value,
            items: items
          });
        });
      } else {
        _this.setState({
          value: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getAsyncConfig", function (asyncConfig) {
      var config = {
        url: '',
        request: null,
        valueKey: null,
        labelKey: null
      };

      switch (_typeof(asyncConfig)) {
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
    });

    var _this$props = _this.props,
        autofocus = _this$props.autofocus,
        schema = _this$props.schema,
        _value = _this$props.value,
        options = _this$props.options,
        asyncLoad = _this$props.asyncLoad,
        otherProps = _objectWithoutProperties(_this$props, ["autofocus", "schema", "value", "options", "asyncLoad"]);

    var _options$autoComplete = options.autoComplete,
        async = _options$autoComplete.async,
        autoCompleteOptions = _objectWithoutProperties(_options$autoComplete, ["async"]);

    var autoCompleteSettings = _objectSpread({
      autoFocus: autofocus
    }, otherProps, {}, autoCompleteOptions);

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

    var _items = autoCompleteSettings.items,
        autoCompleteProps = _objectWithoutProperties(autoCompleteSettings, ["items"]);

    _this.autoCompleteProps = autoCompleteProps;
    _this.state = {
      value: _value,
      items: _items
    };
    return _this;
  }

  _createClass(AutoComplete, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          value = _this$state.value,
          items = _this$state.items;
      return _react.default.createElement(_reactAutocomplete.default, _extends({}, this.autoCompleteProps, {
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

AutoComplete.defaultProps = {
  items: [],
  getItemValue: getValueFromItem,
  renderItem: renderItemByDefault
};
AutoComplete.prototypes = {
  items: _propTypes.default.array,
  getItemValue: _propTypes.default.func,
  renderItem: _propTypes.default.func,
  asyncLoad: _propTypes.default.func
};
var _default = AutoComplete;
exports.default = _default;