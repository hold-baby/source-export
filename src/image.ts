import { baseOptions, IBaseOptions, IStaticOptions } from "./config"
import { genStatic } from "./static"
import { merge } from "lodash"

interface IGenImageOptions extends IBaseOptions {}

const exts = ["bmp","jpg","jpge","png","gif","webp"]

export const genImage = (options: Omit<IGenImageOptions, "exts"> & Partial<Pick<IGenImageOptions, "exts">>) => {
  const opt = merge(baseOptions, options, {
    exts,
    transfer: "O",
    exportStart: "Img"
  } as IStaticOptions)
  genStatic(opt)
}