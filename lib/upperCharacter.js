var randint = require('funkit').math.randint;


module.exports = function() {
    return String.fromCharCode(randint(65, 90));
};
