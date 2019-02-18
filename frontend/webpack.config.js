const {resolve} = require('path');

/**
 * The only purpose of this file is better IDE support.
 */
module.exports = {
    resolve: {
        extensions: ['.js', '.json', '.vue', '.ts'],
        root: resolve(__dirname),
        alias: {
            '@': resolve(__dirname),
            '~': resolve(__dirname),
        },
    },
};
