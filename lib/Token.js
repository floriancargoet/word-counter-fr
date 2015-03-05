var rules = require('./rules');

function Token(){
  this.type  = 'word';
  this.value = '';
  this.start = 0;
  this.end   = 0;
}

Token.prototype.toWords = function () {

  var self = this;
  var words = [];

  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    var result = rule(self, words);
    if (result === rules.STOP) {
      return words;
    }
  }
  return words;

};

Token.prototype.open = function (index) {
  this.start = index;
};

Token.prototype.close = function (index) {
  this.end = index;
  this.clean();
};

Token.prototype.clean = function () {
  // TODO: fix indices
  var value = this.value;

  value = value.toLowerCase();
  // remove some symbols
  value = value.replace(/["«»\[\](){}|*+]/g, '');

  // replace similar symbols by a common one
  value = value.replace(/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D]/g, '-')
               .replace(/[’']/g, '’');

  // trim hyphens and apostrophes
  value = value.replace(/^[-’]+/, '')
               .replace(/[-’]+$/, '');

  this.value = value;
};

Token.prototype.makeWord = function (text, start, end) {
  if (start == null) start = this.start;
  if (end   == null) end   = this.end;
  return {
    value : text,
    start : start,
    end   : end
  };
};

var separatorRegex = /[\s.,;:!?\n]/;
Token.fromString = function (string) {
  var tokens = [];
  var currentToken;
  var i = 0, c;
  while (i < string.length) {
    c = string.charAt(i);
    if (separatorRegex.test(c)) {
      if (currentToken) {
        currentToken.close(i - 1);
        tokens.push(currentToken);
        currentToken = null;
      }
    } else {
      if (!currentToken) {
        currentToken = new Token();
        currentToken.open(i);
      }
      currentToken.value += c;
    }
    i++;
  }
  // close current token
  if (currentToken) {
      currentToken.close(i - 1);
      tokens.push(currentToken);
  }
  return tokens;
};

module.exports = Token;