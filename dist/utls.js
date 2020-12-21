"use strict";
exports.__esModule = true;
exports.toUpperCamelCase = void 0;
var lodash_1 = require("lodash");
var toUpperCamelCase = function (str) { return lodash_1.upperFirst(lodash_1.camelCase(str)); };
exports.toUpperCamelCase = toUpperCamelCase;
