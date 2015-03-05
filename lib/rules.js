var STOP = {};

function split(string, separatorRe, callback) {
  var current, lastSeparator, c;
  var i = 0, l = string.length;
  while (i < l) {
    c = string.charAt(i);
    if(!separatorRe.test(c)) {
      if (!current) {
        current = '';
      }
      current += c;
      i++;
    } else {
      if (current) {
        callback(current, lastSeparator);
        current = null;
        lastSeparator = '';
      }
      lastSeparator += c;
      i++;
    }
  }
  if (current) {
    callback(current, lastSeparator);
  }
}

module.exports = [
  function empty(token) {
    if (!token.value) {
      return STOP;
    }
  },

  function euphonic_l(token, words) {
    if ('l’on' === token.value) {
      words.push(token.makeWord('on', token.start + 2));
      return STOP;
    }
  },

  function euphonic_t(token) {
    // the t is replace by an hyphen, creating a triple hyphen
    // so that the indices are kept
    token.value = token.value.replace(/-t-/g, '---');
  },

  function special_apostophes(token, words) {
    // apostrophes count as 2 words except special cases
    if ('aujourd’hui' === token.value) {
      words.push(token.makeWord(token.value));
      return STOP;
    }
  },

  function apostrophes_hyphens(token, words) {
    var shift = 0;
    split(token.value, /[’-]/, function (w, separatorBefore) {
      if (separatorBefore) {
        shift += separatorBefore.length;
      }
      var start = token.start + shift;
      var end = start + w.length - 1;
      shift += w.length;
      words.push(token.makeWord(w, start, end));
    });
    // TODO: special case like "socio-économique" (1 word) ("e-mail" == ?)
  }
];

module.exports.STOP = STOP;
