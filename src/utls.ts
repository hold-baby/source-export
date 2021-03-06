import { sync } from "glob"
import { upperFirst, camelCase, isEmpty } from "lodash"
import { dirname, extname, basename, relative } from "path"

export const toUpperCamelCase = (str: string) => upperFirst(camelCase(str))

export const getFiles = (inputPath: string, outputPath: string, exts: string[]) => {
  const outputDir = dirname(outputPath)
  return sync(`${inputPath}${!isEmpty(exts) ? `/**/*.{${exts.join(",")}}` : ""}`).map((filepath) => {
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
}