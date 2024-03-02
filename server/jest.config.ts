import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    '^(\\.\\.?\\/.+)\\.js$': '$1',
  },
};

export default config;
