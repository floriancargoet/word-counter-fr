var Token = require('./lib/Token');

function countWords (str) {
  /*
   * steps:
   *  1. split str into list of word-like tokens
   *  2. convert each token to a list of its words (mostly, only one word)
   */
  var tokens = Token.fromString(str);
  var words = [];
  tokens.forEach(function (token) {
    words.push.apply(words, token.toWords());
  });

  return {
    count : words.length,
    words : words
  };
}

module.exports = countWords;