"use strict";
exports.__esModule = true;
exports.genStatic = void 0;
var globby_1 = require("globby");
var path_1 = require("path");
var fs_1 = require("fs");
var config_1 = require("./config");
var utls_1 = require("./utls");
var lodash_1 = require("lodash");
var genStatic = function (options) {
    var opt = lodash_1.merge(config_1.baseOptions, options);
    var input = opt.input, output = opt.output, exts = opt.exts;
    var inputPath = path_1.resolve(input);
    var outputPath = path_1.resolve(output);
    var outputDir = path_1.dirname(outputPath);
    var files = globby_1.sync(inputPath, {
        expandDirectories: {
            extensions: exts
        }
    }).map(function (filepath) {
        var ext = path_1.extname(filepath);
        var fileName = path_1.basename(filepath, ext);
        var importPath = path_1.relative(outputDir, filepath);
        var exportName = utls_1.toUpperCamelCase(filepath.replace(inputPath, "").replace(ext, ""));
        return {
            ext: ext,
            fileName: fileName,
            importPath: importPath,
            exportName: exportName,
            filepath: filepath
        };
    });
    if (!files.length) {
        console.log("nothing");
        return;
    }
    var imports = [];
    var exports = [];
    files.forEach(function (_a) {
        var importPath = _a.importPath, exportName = _a.exportName;
        imports.push("import O" + exportName + " from \"./" + importPath + "\"");
        exports.push("export const Img" + exportName + " = O" + exportName);
    });
    var content = [imports.join("\n"), "", exports.join("\n")].join("\n");
    fs_1.writeFileSync(path_1.resolve(output), content, "utf-8");
};
exports.genStatic = genStatic;
