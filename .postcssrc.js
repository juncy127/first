// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": [
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-calc'),
    require('postcss-mixins'),
    require('postcss-bem-fix')({
      defaultNamespace: 'iridium'
    }),
    require('postcss-cssnext'),
    // to edit target browsers: use "browserslist" field in package.json
  ]
}
