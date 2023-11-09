/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodbUsername: 'pmarkowski1980',
        mongodbPassword: 'testPassw0rd',
        mongodbClusterName: 'cluster0',
        mongodbDatabase: 'my-site-dev',
      },
    };
  };
};

module.exports = nextConfig;
