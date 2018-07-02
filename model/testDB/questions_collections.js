let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//  数据库集合名称：questions_collections    创建于7/2
let questionsCollectionsSchema = new Schema({
    question_id:{
        type: String,
        required: true,
        unique: true
    },
    user_id:{
        type: String,
        required: true,
        unique: true
    },
    collectionTime:{
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('questionsCollections', questionsCollectionsSchema);
