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
exports.ReactAutoComplete = exports.ReactSelection = undefined;

var _selection = require('./widgets/selection');

var _selection2 = _interopRequireDefault(_selection);

var _autoComplete = require('./widgets/autoComplete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactSelection = exports.ReactSelection = _selection2.default;
var ReactAutoComplete = exports.ReactAutoComplete = _autoComplete2.default;