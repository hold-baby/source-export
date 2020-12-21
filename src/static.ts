import { sync } from "globby"
import { dirname, resolve, extname, basename } from "path"
import { writeFileSync } from "fs"
import { baseOptions, IStaticOptions } from "./config"
import { toUpperCamelCase } from "./utls"
import { merge } from "lodash"


export const genStatic = (options: IStaticOptions) => {
  const opt = merge(baseOptions, options)
  const { input, output, exts } = opt
  const rootDir = resolve(input)
  const files = sync(rootDir, {
    expandDirectories: {
      extensions: exts
    }
  }).map((filepath) => {
    const dir = dirname(filepath).replace(`${rootDir}`, "")
    const ext = extname(filepath);
    const file = basename(filepath, ext);
    const filePath = filepath.replace(`${rootDir}`, "")
    return {
      ext,
      file,
      dir,
      filePath
    }
  })
  const imports: string[] = []
  const exports: string[] = []
  files.forEach(({ filePath, ext }) => {
    const name = toUpperCamelCase(filePath.replace(ext, ""))
    imports.push(`import O${name} from "${filePath}"`)
    exports.push(`export const Img${name} = O${name}`)
  })
  const content = [imports.join("\n"), "", exports.join("\n")].join("\n")
  writeFileSync(resolve(output), content, "utf-8")
}