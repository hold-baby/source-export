export interface IBaseOptions {
  input: string;
  output: string;
  exts: string[];
}
export interface IStaticOptions extends IBaseOptions {
  exportStart: string;
  transfer: string;
}
export const baseOptions: IBaseOptions =  {
  input: "./",
  output: "./index.js",
  exts: []
}