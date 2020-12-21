export interface IBaseOptions {
    input: string;
    output: string;
    exts: string[];
}
export interface IStaticOptions extends IBaseOptions {
    exportStart: string;
    transfer: string;
}
export declare const baseOptions: IBaseOptions;
