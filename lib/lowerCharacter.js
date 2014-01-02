var annotate = require('annotate');
var is = require('annois');


module.exports = function(randint) {
    return annotate('character', 'Generates a random lower character')
        .on(function() {
            return String.fromCharCode(randint(97, 122));
        }).satisfies(is.character);
};
