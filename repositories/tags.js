const { Tag } = require('../models')


module.exports = {
    getAllTags() {
        return Tag.findAll();
    },
    getTag(id){
        return Tag.findOne({ where: { id: id } });
    },
    addTag(tag) {
        return Tag.create({
            name: tag.name,
        });
    },
    updateTag( tag ) { 
        let tagObj = {...tag};
        delete tagObj.id;
        tagObj.updatedAt = new Date();
        return Tag.update( tagObj, { where: { id: tag.id} });
    },
    deleteTag(id) { 
        return Tag.destroy( { where: { id: id}});
    },
    getArticleTags(ArticleModel){
        return Tag.findAll({include: [{
                model: ArticleModel,
                as: 'article'
            }]
        });
    }
}
    