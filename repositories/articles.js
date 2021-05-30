const { Article } = require('../models')


module.exports = {
    getAllArticles() {
        return Article.findAll();
    },
}
    