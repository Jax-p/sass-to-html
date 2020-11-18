const fs = require('fs');
const sass = require('sass');
const watch = require('node-watch');
const chalk = require('chalk');
const { log, error } = require('./cli.js');
const SASS_OPTIONS = { outputStyle: "compressed" };
const WATCH_EVT_REMOVE = "remove";
const WATCH_EVT_REMOVE_MSG = (name) => ({message:`File ${name} has been removed.`});

const watchScss =()=> {
    log(`Watching `+chalk.blue(program.scss));
    try {
        watch(program.scss, {}, (evt, name) =>
            evt === WATCH_EVT_REMOVE
                ? error(WATCH_EVT_REMOVE_MSG(name), true)
                : build(name)
        )
    }
    catch (err) { error(err,true) }
};

const build =()=> {
    const renderTimeMsg = "Build time";
    console.time(renderTimeMsg);
    sass.render({file: program.scss, ...SASS_OPTIONS}, (err, result) => {
        err
            ? error(err, false, () => console.timeEnd(renderTimeMsg))
            : writeCssToHtml(result.css.toString())
                .then(()=>console.timeEnd(renderTimeMsg))
                .catch(error);
    });
};

/** @param {string} css */
const writeCssToHtml = (css) =>
    new Promise((resolve,reject)=>{
        fs.readFile(program.html, 'utf8', (err,html)=>{
            err && error(err);
            try {
                html = pasteCssToHtmlString(html,css);
                fs.writeFileSync(program.html,html);
                log(`Output written to `+chalk.blue(program.html));
                resolve();
            } catch (err) {
                reject(err);
            }
        })
    });

/**
 * @param {string} html
 * @param {string} css
 * @return {string}
 */
const pasteCssToHtmlString=(html, css)=> {
    const hasStyleTag = html.search(/<style>([^<]+)<\/style>/g) !== -1;
    const hasHeadTag = html.search("</head>") !== -1;
    if (!hasStyleTag && !hasHeadTag)
        error({message:`Neither <head> nor <style> was found in ${program.html}.`})

    const styles = `<style>${css.replace(/\r?\n|\r/g,"")}</style>`;
    return hasStyleTag
        ? html.replace(/<style>([^<]+)<\/style>/g,styles)
        : html.replace('</head>',`${styles}\n</head>`);
};

exports.watch = watchScss;
exports.build = build;
