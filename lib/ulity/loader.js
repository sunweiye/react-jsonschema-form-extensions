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
exports.loadDataFromRemote = void 0;

var loadDataFromRemote = function loadDataFromRemote(url) {
  var req = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return fetch(url, req).then(function (response) {
    return response.json();
  });
};

exports.loadDataFromRemote = loadDataFromRemote;