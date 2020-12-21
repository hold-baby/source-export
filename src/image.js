const globby = require("globby")
const path = require("path")
const utls = require("./utls")
const conf = require("./config")
const fs = require("fs")

const exts = ["bmp","jpg","jpge","png","gif","webp"]

module.exports = (options) => {
  const opt = Object.assign(conf, options)
  const rootDir = path.resolve(opt.input)
  const files = globby.sync(rootDir, {
    expandDirectories: {
      extensions: exts
    }
  }).map((filepath) => {
    const dir = path.dirname(filepath).replace(`${rootDir}`, "")
    const ext = path.extname(filepath);
    const file = path.basename(filepath, ext);
    const filePath = filepath.replace(`${rootDir}`, "")
    return {
      ext,
      file,
      dir,
      filePath
    }
  })
  const imports = []
  const exports = []
  files.forEach((file) => {
    const name = utls.toUpperCamelCase(file.filePath.replace(file.ext, ""))
    imports.push(`import O${name} from "${file.filePath}"`)
    exports.push(`export const Img${name} = O${name}`)
  })
  const content = [imports.join("\n"), "", exports.join("\n")].join("\n")
  fs.writeFileSync(path.resolve(opt.output), content, "utf-8")
}