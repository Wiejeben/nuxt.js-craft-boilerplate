const {join} = require('path');
const purgecss = require('@fullhuman/postcss-purgecss');

const tailwindConfig = join(__dirname, 'tailwind.js');

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || []
    }
}

module.exports = {
    plugins: [
        require('tailwindcss')(tailwindConfig),
        require('autoprefixer'),
        purgecss({
            content: [
                join(__dirname, './pages/**/*.vue'),
                join(__dirname, './layouts/**/*.vue'),
                join(__dirname, './components/**/*.vue')
            ],
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ['vue', 'js', 'html']
                }
            ],
            // make sure these values do not get purged
            whitelist: ['html', 'body', 'nuxt-progress']
        })
    ]
};
