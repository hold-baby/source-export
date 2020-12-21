const _ = require("lodash")

exports.blocks = (...args) => args.join("\n\n");
exports.lines = (...args) => args.join("\n");
exports.toUpperCamelCase = (str) => _.upperFirst(_.camelCase(str))