import { IBaseOptions } from "./config";
interface IGenImageOptions extends IBaseOptions {
}
export declare const genImage: (options: Pick<IGenImageOptions, "input" | "output"> & Partial<Pick<IGenImageOptions, "exts">>) => void;
export {};
