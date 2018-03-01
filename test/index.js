var test = require('tape')
var webpack = require('webpack')
var config = require('./fixtures/webpack.config')
var assign = require('object-assign')

test.skip('logs warning with snazzy', function (t) {
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length, 'has warnings')
    t.ok(!stats.compilation.errors.length, 'has no errors')
    var warning = stats.compilation.warnings[0]
    t.ok(warning && /semicolon/gm.test(warning.warning), 'has warning about semicolon')
    t.ok(warning && warning.warning.indexOf('\n\u001b') !== -1, 'uses snazzy output')
    t.end()
  })
})

test.skip('can disable snazzy output', function (t) {
  var preloader = assign({}, config.module.rules[0], {
    options: {
      snazzy: false
    }
  })

  config.module.rules[0] = preloader
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length, 'has warnings')
    t.ok(!stats.compilation.errors.length, 'has no errors')
    var warning = stats.compilation.warnings[0]
    t.ok(warning && /semicolon/gm.test(warning.warning), 'has warning about semicolon')
    console.log('\n\n', warning, '\n\n')
    t.equal(warning && warning.warning.indexOf('\n\u001b'), -1, 'snazzy output disabled')
    t.end()
  })
})

test.skip('logs error', function (t) {
  var preloader = assign({}, config.module.rules[0], {
    options: {
      error: true
    }
  })

  config.module.rules[0] = preloader
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.errors.length, 'has errors')
    t.ok(!stats.compilation.warnings.length, 'has no warnings')
    const error = stats.compilation.errors[0]
    t.ok(error && /semicolon/gm.test(error.error), 'has error about semicolon')
    t.end()
  })
})

test.skip('works without options', function (t) {
  var preloader = assign({}, config.module.rules[0])
  delete preloader.options

  config.module.rules[0] = preloader
  webpack(config, function (err, stats) {
    t.ifError(err)
    t.ok(stats.compilation.warnings.length, 'has warnings')
    t.ok(!stats.compilation.errors.length, 'has no errors')
    t.end()
  })
})
