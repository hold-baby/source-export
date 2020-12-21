"use strict";
exports.__esModule = true;
exports.genImage = void 0;
var config_1 = require("./config");
var static_1 = require("./static");
var lodash_1 = require("lodash");
var exts = ["bmp", "jpg", "jpge", "png", "gif", "webp"];
var genImage = function (options) {
    var opt = lodash_1.merge(config_1.baseOptions, options, {
        exts: exts,
        transfer: "O",
        exportStart: "Img"
    });
    static_1.genStatic(opt);
};
exports.genImage = genImage;
