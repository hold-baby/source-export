import { resolve } from "path"
import { writeFileSync } from "fs"
import { baseOptions, IStaticOptions } from "./config"
import { getFiles } from "./utls"
import { merge, Dictionary, keys } from "lodash"
import "colors"

export const genStatic = (options: IStaticOptions) => {
  const opt = merge(baseOptions, options)
  const { input, output, exts } = opt
  const inputPath = resolve(input)
  const outputPath = resolve(output)

  const files = getFiles(inputPath, outputPath, exts)
  
  if(!files.length){
    console.log("nothing");
    return
  }
  let isErr = false
  const errMap: Dictionary<any> = {}
  const imports: string[] = []
  const exports: string[] = []
  files.forEach(({ importPath, exportName, filepath }) => {
    const errPath = `  ${filepath}`
    if(errMap[exportName]){
      isErr = true
      errMap[exportName].push(errPath)
    }else{
      errMap[exportName] = [errPath]
    }
    imports.push(`import O${exportName} from "./${importPath}"`)
    exports.push(`export const Img${exportName} = O${exportName}`)
  })
  if(isErr){
    const errors = keys(errMap).filter(key => errMap[key].length > 1).map(key => ({
      key,
      error: errMap[key].join("\n")
    }))
    console.log(`duplicate module`.red);
    console.log(errors.map(({ key, error }) => {
      return [`${key}:`.green, error.yellow].join("\n")
    }).join("\n"));
    return
  }
  const content = [imports.join("\n"), "", exports.join("\n")].join("\n")
  writeFileSync(outputPath, content, "utf-8")
  console.log(`generated file ${outputPath}`.green)
}