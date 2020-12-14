'use strict';

const {Cli} = require(`./cli`);
const {ExitCode, USER_ARGV_INDEX, DEFAULT_COMMAND, USER_ARGV_ANOTHER_COMMANDS_INDEX} = require(`../const`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArguments.slice(USER_ARGV_ANOTHER_COMMANDS_INDEX));
