
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionSchema = new Schema({
    qst_id:{
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true,
        unique: true
    },
    user_id:Number,
    //----> 5/28新增（0->非热门，1—>热门）
    is_hot: Number,     //----> 5/28新增（0->非热门，1—>热门）
    is_recommend:Number,    //----> 5/28新增（0->非推荐，1—>推荐）
    sort:Number,//------>5/28 新增 排序
    //----> 5/28新增（0->非热门，1—>热门）

    //-----------以下名称换了---------------
    qst_classify:{
        type: String,
    },              //问答分类
    classify:String,    //(新)----> 5/28新增
    qst_label:{
        type: String,
    },               //问答标签
    label:String,   //(新) ----> 5/28新增（原创+转载）
    qst_createTime:{
        type: Date,
        default: Date.now()
    },
    create_at:Date.now(),//(新) ----> 5/28新增
    //-----------以上名称换了---------------

    qst_title:{
        type: String,
    },
    qst_content:{
        type: String,
    },

    qst_updateTime:{
        type: Date,
        default: Date.now()
    },
    qst_deleteTime:{
        type: Date,
        default: Date.now()
    },
    qst_state:{
        type: Number,
        default: 0
    },   //问答状态：0:正常可读，1：待审阅，2：已删除
    qst_praise:{
        type: Number,
        default: 0
    },   //问答点赞数。


    qst_answerNumber:{       // 6/2   可以不添加
        type: Number,
        default: 0
    },   //回答数。
    qst_answer:{
        answer_user:{
            type: String,
        },
        answer_userAvatar:{
            type: String,
        },
        answer_time:{
            type: Date,
            default: Date.now()
        },
        answer_state:{
            type: Number,
            default: 0
        },  //回答状态。0:可见，1：不可见（用户删除）
        answer_content:{
            type: String,
        },
        answer_praise:{
            type: Number,
            default: 0
        },   //回答点赞数。
    }         // 6/2   可以不添加
});

module.exports = mongoose.model('Question', questionSchema);