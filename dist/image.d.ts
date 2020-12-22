import { IBaseOptions } from "./config";
interface IGenImageOptions extends IBaseOptions {
}
export declare const genImage: (options: Omit<IGenImageOptions, "exts"> & Partial<Pick<IGenImageOptions, "exts">>) => void;
export {};
