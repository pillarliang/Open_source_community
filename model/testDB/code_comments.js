// 5.30 新增改
const commentsSchema = new Schema({
    comments_id:{
        unique:true,
        type:Number,
        required:true,
    },
    user_id:Number,     //评论者的id
    code_id:Number,     //开源项目的id   5.30 新增
    create_at:Date,       //5.30 新增
    content:String,
    state:Number,   //0->禁用，1->正常
    score:Number,   //6/4 补充：评论的星级 0-5
});