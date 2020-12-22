export declare const toUpperCamelCase: (str: string) => string;
export declare const getFiles: (inputPath: string, outputPath: string, exts: string[]) => {
    ext: string;
    fileName: string;
    importPath: string;
    exportName: string;
    filepath: string;
}[];
