module.exports = {
    "globDirectory": "./",
    "importWorkboxFrom": "local",
    "globIgnores": [
        "node_modules/**/*",
        "package*",
        "workbox-config.js"
    ],
    "runtimeCaching": [{
        "urlPattern": /\.(?:png|gif|jpg|jpeg|svg)$/,
        "handler": "CacheFirst",
        "options": {
            "cacheName": "image-cache"
        }
    }],
    "globPatterns": [
        "**/*.{json,jpg,html,js,css}",
        "./node_modules/wcomponent-check-connexion/**/*.js",
        "./node_modules/lit-element/**/*.js",
        "./node_modules/lit-html/**/*.js",
        "./src/assets/**/*"
    ],
    "swDest": "sw.js"
};