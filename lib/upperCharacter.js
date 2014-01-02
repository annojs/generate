var annotate = require('annotate');
var is = require('annois');


module.exports = function(randint) {
    return annotate('character', 'Generates a random upper character')
        .on(function() {
            return String.fromCharCode(randint(65, 90));
        }).satisfies(is.character);
};
