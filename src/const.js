'use strict';

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;
const USER_ARGV_ANOTHER_COMMANDS_INDEX = 1;

const ExitCode = {
  error: 1,
  success: 0,
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  USER_ARGV_ANOTHER_COMMANDS_INDEX,
  ExitCode
};
