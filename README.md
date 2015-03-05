#Word Counter (french rules)

## Usage

    var countWords = require('word-counter-fr');

    var result = countWords("Qu'est-ce que j'ai mangé aujourd'hui ? Viendra-t-il me voir ?");

    console.log(result);

    { count: 12,
      words:
       [ { value: 'qu', start: 0, end: 1 },
         { value: 'est', start: 3, end: 5 },
         { value: 'ce', start: 7, end: 8 },
         { value: 'que', start: 10, end: 12 },
         { value: 'j', start: 14, end: 14 },
         { value: 'ai', start: 16, end: 17 },
         { value: 'mangé', start: 19, end: 23 },
         { value: 'aujourd’hui', start: 25, end: 35 },
         { value: 'viendra', start: 39, end: 45 },
         { value: 'il', start: 49, end: 50 },
         { value: 'me', start: 52, end: 53 },
         { value: 'voir', start: 55, end: 58 } ] }

## Build for browser

    browserify index.js -o dist/word-counter-fr.js -s countWords


## Rules

TODO

