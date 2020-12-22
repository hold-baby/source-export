"use strict";
exports.__esModule = true;
exports.getFiles = exports.toUpperCamelCase = void 0;
var globby_1 = require("globby");
var lodash_1 = require("lodash");
var path_1 = require("path");
var toUpperCamelCase = function (str) { return lodash_1.upperFirst(lodash_1.camelCase(str)); };
exports.toUpperCamelCase = toUpperCamelCase;
var getFiles = function (inputPath, outputPath, exts) {
    var outputDir = path_1.dirname(outputPath);
    return globby_1.sync(inputPath, {
        expandDirectories: {
            extensions: exts
        }
    }).map(function (filepath) {
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
