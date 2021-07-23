'use strict';

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;
const USER_ARGV_ANOTHER_COMMANDS_INDEX = 1;
const FILE_NAME = `mocks.json`;
const API_PREFIX = `/api`;

const ExitCode = {
  error: 1,
  success: 0,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  CREATED: 201
};

module.exports.HttpMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  USER_ARGV_ANOTHER_COMMANDS_INDEX,
  ExitCode,
  HttpCode,
  FILE_NAME,
  API_PREFIX,
  Env
};
