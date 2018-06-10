let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//  数据库集合名称：code
let codeSchema = new Schema({
    code_id:{
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true,
        unique: true
    },

    is_hot: Number,     //----> 5/28新增（0->非热门，1—>热门）
    is_recommend:Number,    //----> 5/28新增（0->非推荐，1—>推荐）
    sort:Number,//------>5/28 新增 排序
    language:String,//--->6/4 新增开发语言
    collection:Array,// 6/4 新增收藏，存放收藏用户的id

    //-----------以下名称换了---------------
    code_classify:{
        type: String,
        required: true,
        unique: true
    }, //代码分类
    classify:String,    //(新)----> 5/28新增

    code_label:{
        type: String,
        required: true,
        unique: true
    },    //代码标签
    label:String,   //(新) ----> 5/28新增（原创+转载）

    code_createTime:{
        type: Date,
        default: Date.now()
    },
    create_at:Date.now(),//(新) ----> 5/28新增

    //-----------以上名称换了---------------

    code_title:{
        type: String,
        required: true,
        unique: true
    },
    code_content:{
        type: String,
        required: true,
        unique: true
    },

    code_updateTime:{
        type: Date,
        default: Date.now()
    },
    code_deleteTime:{
        type: Date,
        default: Date.now()
    },
    code_state:{
        type: Number,
        default: 0
    },   //代码状态：0:正常可读，1：待审阅，2：已删除
    code_praise:{
        type: Number,
        default: 0
    },  //代码点赞数。
    code_commentNumber:{
        type: Number,
        default: 0
    },  //评论数。
    code_comment:{
        comment_user:{
            type: String,
        },
        comment_userAvatar:{
            type: String,
        },
        comment_time:{
            type: Date,
            default: Date.now()
        },
        comment_state:{
            type: Number,
            default: 0
        }, //评论状态。0:可见，1：不可见（用户删除）
        comment_content:{
            type: String,
            required: true,
            unique: true
        },
        comment_praise:{
            type: Number,
            default: 0
        },  //评论点赞数。
    }
});

module.exports = mongoose.model('Code', codeSchema);
