module.exports = {
  'extends': 'airbnb',
  'env': {
    'browser': true,
    'es6': true,
  },
  'globals': {
    'google': true,
    'MarkerClusterer': true,
  },
  'rules': {
    'comma-dangle': [ 'error', { 'arrays': 'always', 'objects': 'always', 'imports': 'always', 'exports': 'always', 'functions': 'never' }],
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'linebreak-style': 'off',
  },
};
