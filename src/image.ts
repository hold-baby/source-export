import { defaultOptions, IBaseOptions, IStaticOptions } from "./config"
import { genStatic } from "./static"
import { merge } from "lodash"

interface IGenImageOptions extends IBaseOptions {}

const exts = ["bmp","jpg","jpge","png","gif","webp"]

export const genImage = (options: IGenImageOptions) => {
  const opt = merge(defaultOptions, options, {
    exts,
    transfer: "O",
    exportStart: "Img"
  } as IStaticOptions)
  genStatic(opt)
}