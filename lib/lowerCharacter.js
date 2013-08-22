var annotate = require('annotate');
var randint = require('funkit').math.randint;
var is = require('annois');


module.exports = annotate('character', 'Generates a random lower character').
    on(function() {
        return String.fromCharCode(randint(97, 122));
    }).satisfies(is.character);