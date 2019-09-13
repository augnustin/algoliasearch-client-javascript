/* eslint-disable import/no-commonjs, functional/immutable-data */

require('dotenv').config();

const baseConfig = require('./wdio.base.conf');

exports.config = {
  ...baseConfig,
  services: [...(baseConfig.services || []), 'sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  sauceConnect: true,
  maxInstances: 5,
  specFileRetries: 0,
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: '76.0',
    },
    {
      browserName: 'firefox',
      browserVersion: '68.0',
    },
    {
      browserName: 'internet explorer',
      browserVersion: '11.285',
    },
  ],
};