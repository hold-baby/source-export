#!/usr/bin/env node
'use strict';
require("colors")
const path = require("path")
const p = require('commander');
const pkg = require("../package.json")
const gen = require("../dist")

p.version(banner(), '-v')
  .option('-i, --input <value>', 'input files dir')
  .option('-o, --output <value>', 'output filename')
  .option('--img', 'image type', 'export images')
p.parse(process.argv);

if(p.img){
  gen.genImage({
    input: path.resolve(process.cwd(), p.input || "./"),
    output: path.resolve(process.cwd(), p.output || "index.js")
  })
}else{
  console.log("nothing");
}

function banner(){
  return [
    `/**!`,
    ` * ${pkg.name.red} - ${`v${pkg.version}`.yellow}`,
    ` * ${pkg.description}`,
    ` * ${`${pkg.license} (c) ${pkg.author}`.gray}`,
    ` */`
  ].join('\n')
} 