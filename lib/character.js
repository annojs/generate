var annotate = require('annotate');
var randint = require('funkit').math.randint;
var is = require('annois');


module.exports = annotate('character', 'Generates a random character').
    on(function() {
        return String.fromCharCode(randint(33, 126));
    }).satisfies(is.character);
