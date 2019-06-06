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
exports.ReactAutoComplete = exports.ReactSelection = void 0;

var _selection = _interopRequireDefault(require("./widgets/selection"));

var _autoComplete = _interopRequireDefault(require("./widgets/autoComplete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactSelection = _selection.default;
exports.ReactSelection = ReactSelection;
var ReactAutoComplete = _autoComplete.default;
exports.ReactAutoComplete = ReactAutoComplete;