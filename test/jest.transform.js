module.exports = require('babel-jest').createTransformer({
  presets: [
    '@babel/preset-react',
    ['@babel/env', { targets: { node: 'current' } }],
  ],
});
