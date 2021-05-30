const { Tag } = require('../models')


module.exports = {
    getAllTags() {
        return Tag.findAll();
    },
}
    