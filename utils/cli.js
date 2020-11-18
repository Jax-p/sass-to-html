const chalk = require('chalk');
const strftime = require('strftime');
const { watch } = require('./builder.js');

const time = () =>
    chalk.magenta(strftime('%H:%M:%S'));

/** @param {string} msg */
const log = (msg) =>
    program.watch
        ? console.log(time(),msg)
        : console.log(msg);

const error = (err, exit = false, callback) => {
    log(chalk.red(program.debug ? err : err.message));
    (!program.watch || exit) && process.exit(1);
    callback && callback();
};

exports.log = log;
exports.error = error;
