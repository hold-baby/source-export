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
    var rootDir = path_1.resolve(input);
    var files = globby_1.sync(rootDir, {
        expandDirectories: {
            extensions: exts
        }
    }).map(function (filepath) {
        var dir = path_1.dirname(filepath).replace("" + rootDir, "");
        var ext = path_1.extname(filepath);
        var file = path_1.basename(filepath, ext);
        var filePath = filepath.replace("" + rootDir, "");
        return {
            ext: ext,
            file: file,
            dir: dir,
            filePath: filePath
        };
    });
    var imports = [];
    var exports = [];
    files.forEach(function (_a) {
        var filePath = _a.filePath, ext = _a.ext;
        var name = utls_1.toUpperCamelCase(filePath.replace(ext, ""));
        imports.push("import O" + name + " from \"" + filePath + "\"");
        exports.push("export const Img" + name + " = O" + name);
    });
    var content = [imports.join("\n"), "", exports.join("\n")].join("\n");
    fs_1.writeFileSync(path_1.resolve(output), content, "utf-8");
};
exports.genStatic = genStatic;
