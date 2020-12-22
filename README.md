# source-export
export source in one file

### Install
```
npm i source-export -g
```
### In cmd
```
Usage: exp [options]
Options:
  -v                    output the version number
  -i, --input <value>   input files dir
  -o, --output <value>  output filename
  --img                 image type
  -h, --help            display help for command
```
### In script
```javascript
import { genImage } from "source-export"
import { resolve } from "path"

genImage({
  input: resolve(__dirname, sourceDir),
  output: resolve(__dirname, outputPath)
})
```
### Example
source dir
+ source/dog.jpg
```javascript
genImage({
  input: resolve(__dirname, "./source"),
  output: resolve(__dirname, "index.js")
})
```
use
```javascript
import { ImgDog } from "./index"
```