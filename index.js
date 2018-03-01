'use strict'

var standard = require('typescript-standard')
var format = require('util').format
var loaderUtils = require('loader-utils')
var snazzy = require('snazzy')
var assign = require('object-assign')

module.exports = function standardLoader (text) {
  var self = this
  var callback = this.async()

  var config = assign({}, loaderUtils.getOptions(this))
  // TODO: would be nicer if typescript-standard parse the given content instead of loading file again
  config.files = [this.resourcePath]
  this.cacheable()

  config.callback = function (result) {
    var warnings = result.failures.reduce(function (items, result) {
      return items.concat(format(
        '%s:%d:%d: %s%s',
        result.fileName,
        result.startPosition.lineAndCharacter.line || 0,
        result.startPosition.lineAndCharacter.character || 0,
        result.failure,
        config.verbose ? ' (' + result.ruleName + ')' : ''
      ))
    }, [])
    .join('\n')

    if (config.snazzy !== false) {
      snazzy({encoding: 'utf8'})
      .on('data', function (data) {
        emit(data)
      })
      .end(warnings)
    } else {
      emit(warnings)
    }

    callback(null, text)
  }

  standard.lint(config)

  function emit (data) {
    if (config.error) { return self.emitError(data) }
    self.emitWarning(data)
  }
}
