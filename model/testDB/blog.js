//  数据库集合名称：blog
const blogSchema = new Schema({
    blog_id:{
        unique:true,
        type:Number,
        required:true,
    },
    user_id:Number,
    user_name:String,

    classify:String,    //----> 5/28新增
    label:String,   //----> 5/28新增（原创+转载）
    is_hot: Number,     //----> 5/28新增（0->非热门，1—>热门）
    is_recommend:Number,    //----> 5/28新增（0->非推荐，1—>推荐）
    create_at:Date,//----> 5/28新增
    sort:Number,//------>5/28 新增 排序

    catagory:[String],
    mata:{
        create_at:{
            type:Date,
            dafault: Date.now(),
        },
        public_at:{
            type:Date,
            dafault: 0,
        },
        updata_at:{
            type:Date,
            dafault: 0,
        },
        delete_at:{
            type:Date,
            dafault: 0,
        },
    },
    title:String,
    content:String,           //存html格式的文件
    state:{                   // 5/28 审核：0->未通过审核，1->通过审核
        type:Number,
        default:0,
    },
    thinkGreatNum:{
        type:Number,
        default:0,
    },
    thinkGreat:[String],
    pageView:Number,
    commentNum:Number,          //6/2 可以删去
    comments:[{
        user_id:Number,
        user_name:String,
        avatar:String,
        content:String,
        public_at:String,   //--->???
        delete_at:String,
        state:Number,   //0->禁用，1->正常
    }]  //6/2 可以删去
});