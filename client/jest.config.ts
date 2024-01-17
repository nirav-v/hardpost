export default {
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{js,ts,tsx,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/test/mocks/fileMock.js',
  },
};
