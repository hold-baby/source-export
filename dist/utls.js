"use strict";
exports.__esModule = true;
exports.getFiles = exports.toUpperCamelCase = void 0;
var glob_1 = require("glob");
var lodash_1 = require("lodash");
var path_1 = require("path");
var toUpperCamelCase = function (str) { return lodash_1.upperFirst(lodash_1.camelCase(str)); };
exports.toUpperCamelCase = toUpperCamelCase;
var getFiles = function (inputPath, outputPath, exts) {
    var outputDir = path_1.dirname(outputPath);
    return glob_1.sync("" + inputPath + (!lodash_1.isEmpty(exts) ? "/**/*.{" + exts.join(",") + "}" : "")).map(function (filepath) {
        var ext = path_1.extname(filepath);
        var fileName = path_1.basename(filepath, ext);
        var importPath = path_1.relative(outputDir, filepath);
        var exportName = exports.toUpperCamelCase(filepath.replace(inputPath, "").replace(ext, ""));
        return {
            ext: ext,
            fileName: fileName,
            importPath: importPath,
            exportName: exportName,
            filepath: filepath
        };
    });
};
exports.getFiles = getFiles;
