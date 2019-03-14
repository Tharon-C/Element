const path = require('path');

module.exports = {
    components: 'src/components/**/*.js',
    styleguideComponents: {
        Wrapper: path.join(__dirname, './src/ThemeWrapper.js'),
    },
};
