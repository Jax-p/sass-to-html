#!/usr/bin/env node
const { program } = require('commander');
const { watch, build } = require('./utils/builder.js');
const pjson = require('./package.json');
global.program = program;

program
    .version(pjson.version)
    .option('-d, --debug', 'output extra log')
    .option('-w, --watch', 'watch selected .scss file', false)
    .option('-i, --html <type>', 'path to .html file','index.html')
    .option('-s, --scss <type>', 'path to .scss file','style.scss')
    .parse(process.argv);

program.debug && console.log(program.opts());
const start=()=> {
    try { program.watch ? watch() : build(); }
    catch (err) { error(err); }
}
start();

