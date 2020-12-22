import { sync } from "globby"
import { dirname, resolve, extname, basename, relative, join } from "path"
import { writeFileSync } from "fs"
import { baseOptions, IStaticOptions } from "./config"
import { toUpperCamelCase } from "./utls"
import { merge } from "lodash"

export const genStatic = (options: IStaticOptions) => {
  const opt = merge(baseOptions, options)
  const { input, output, exts } = opt
  const inputPath = resolve(input)
  const outputPath = resolve(output)
  const outputDir = dirname(outputPath)

  const files = sync(inputPath, {
    expandDirectories: {
      extensions: exts
    }
  }).map((filepath) => {
    const ext = extname(filepath);
    const fileName = basename(filepath, ext);
    const importPath = relative(outputDir, filepath)
    const exportName = toUpperCamelCase(filepath.replace(inputPath, "").replace(ext, ""))
    return {
      ext,
      fileName,
      importPath,
      exportName,
      filepath
    }
  })
  
  if(!files.length){
    console.log("nothing");
    return
  }
  const imports: string[] = []
  const exports: string[] = []
  files.forEach(({ importPath, exportName }) => {
    imports.push(`import O${exportName} from "./${importPath}"`)
    exports.push(`export const Img${exportName} = O${exportName}`)
  })
  const content = [imports.join("\n"), "", exports.join("\n")].join("\n")
  writeFileSync(resolve(output), content, "utf-8")
}