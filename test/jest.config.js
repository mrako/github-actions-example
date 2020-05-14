module.exports = {
  rootDir: '..',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/test/jest.transform.js',
  },
  testURL: 'http://localhost',
};
