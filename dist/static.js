"use strict";
exports.__esModule = true;
exports.genStatic = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var config_1 = require("./config");
var utls_1 = require("./utls");
var lodash_1 = require("lodash");
require("colors");
var genStatic = function (options) {
    var opt = lodash_1.merge(config_1.baseOptions, options);
    var input = opt.input, output = opt.output, exts = opt.exts;
    var inputPath = path_1.resolve(input);
    var outputPath = path_1.resolve(output);
    var files = utls_1.getFiles(inputPath, outputPath, exts);
    if (!files.length) {
        console.log("nothing");
        return;
    }
    var isErr = false;
    var errMap = {};
    var imports = [];
    var exports = [];
    files.forEach(function (_a) {
        var importPath = _a.importPath, exportName = _a.exportName, filepath = _a.filepath;
        var errPath = "  " + filepath;
        if (errMap[exportName]) {
            isErr = true;
            errMap[exportName].push(errPath);
        }
        else {
            errMap[exportName] = [errPath];
        }
        imports.push("import O" + exportName + " from \"./" + importPath + "\"");
        exports.push("export const Img" + exportName + " = O" + exportName);
    });
    if (isErr) {
        var errors = lodash_1.keys(errMap).filter(function (key) { return errMap[key].length > 1; }).map(function (key) { return ({
            key: key,
            error: errMap[key].join("\n")
        }); });
        console.log("duplicate module".red);
        console.log(errors.map(function (_a) {
            var key = _a.key, error = _a.error;
            return [(key + ":").green, error.yellow].join("\n");
        }).join("\n"));
        return;
    }
    var content = [imports.join("\n"), "", exports.join("\n")].join("\n");
    fs_1.writeFileSync(outputPath, content, "utf-8");
    console.log(("generated file " + outputPath).green);
};
exports.genStatic = genStatic;
