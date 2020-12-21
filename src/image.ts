import { defaultOptions, IStaticOptions } from "./config"
import { genStatic } from "./static"
import { merge } from "lodash"

const exts = ["bmp","jpg","jpge","png","gif","webp"]

export const genImage = (options: IStaticOptions) => {
  const opt = merge(defaultOptions, options, {
    exts,
  })
  genStatic(opt)
}