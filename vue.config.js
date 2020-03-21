const path = require('path');

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    configureWebpack: {
        resolve: {
            alias: {
                Api: path.resolve(__dirname, 'src/api'),
                Components: path.resolve(__dirname, 'src/components/'),
                Views: path.resolve(__dirname, 'src/views/'),
                Event: path.resolve(__dirname, 'src/eventEmitter'),
                Session: path.resolve(__dirname, 'src/session'),
                Store: path.resolve(__dirname, 'src/store'),
                Router: path.resolve(__dirname, 'src/router'),
                Helper: path.resolve(__dirname, 'src/helper'),
                Common: path.resolve(__dirname, 'src/common/')
            }
        }
    }
}