const fs = require('fs');
const sass = require('sass');
const watch = require('node-watch');
const chalk = require('chalk');
const { log, error } = require('./cli.js');
const SASS_OPTIONS = { outputStyle: "compressed" };

const watchScss =()=> {
    log(`Watching `+chalk.blue(program.scss));
    try { watch(program.scss, {}, (evt, name) => build(name)) }
    catch (err) { error(err,true) }
};

const build =()=> {
    const renderTimeMsg = "Build time";
    console.time(renderTimeMsg);
    sass.render({file: program.scss, ...SASS_OPTIONS}, (err, result) => {
        err && error(err);
        writeCssToHtml(result.css.toString())
            .then(()=>console.timeEnd(renderTimeMsg))
            .catch(error);
    });
};

/** @param {string} css */
const writeCssToHtml = (css) =>
    new Promise(resolve=>{
        fs.readFile(program.html, 'utf8', (err,html)=>{
            err && error(err);
            html = html.replace(/<style>([^<]+)<\/style>/g,`<style>${css.replace(/\r?\n|\r/g,"")}</style>`);
            fs.writeFileSync(program.html,html);
            log(`Output written to `+chalk.blue(program.html));
            resolve();
        });
    });

exports.watch = watchScss;
exports.build = build;