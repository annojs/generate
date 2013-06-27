var annotate = require('annotate');
var randint = require('funkit').math.randint;
var is = require('annois');


module.exports = annotate('character', 'Generates a random upper character').
    on(function() {
        return String.fromCharCode(randint(65, 90));
    }).satisfies(is.character);
