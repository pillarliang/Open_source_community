// 5.30 新增改
const classifySchema = new Schema({
    name:String,
    identification:Number,  //对于分类的标识
    create_at:Date,       //5.30 新增
    state:Number,   //0->禁用，1->正常
});