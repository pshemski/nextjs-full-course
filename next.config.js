/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodbUsername: 'pmarkowski1980',
        mongodbPassword: 'a7sZVqd8yUqSQjta',
        mongodbClusterName: 'cluster0',
        mongodbDatabase: 'my-site-dev',
      },
    };
  }
  return {
    env: {
      mongodbUsername: 'pmarkowski1980',
      mongodbPassword: 'a7sZVqd8yUqSQjta',
      mongodbClusterName: 'cluster0',
      mongodbDatabase: 'my-site',
    },
  };
};

module.exports = nextConfig;
