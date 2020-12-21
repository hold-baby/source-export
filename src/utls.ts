import { upperFirst, camelCase } from "lodash"

export const toUpperCamelCase = (str: string) => upperFirst(camelCase(str))