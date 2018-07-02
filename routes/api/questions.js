const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/", async (ctx) => {
    ctx.body = {
        code: 1,
        message: "问答模块api接口",
        data: {}
    };
});

//获取项目分类
router.get("/questions-classify", async (ctx) => {
    try {
        let classifyresult = await DB.find("questions_classify", {});
        ctx.body = {
            code: 1,
            message: "问答分类",
            data: classifyresult
        };
    } catch (e) {
        ctx.body = {
            code: -1,
            message: "问答分类查询失败",
            data: {}
        }
    }

});

//获取项目列表
router.get("/questionslist", async (ctx) => {
    try {
        let page = ctx.query.page || 1;
        let pageSize = 20;
        let questionresult = await DB.find("questions", {}, {}, {
            page: page,
            pageSize: pageSize,
            sortJson: {"created_at": 1}
        });
        for (let i = 0; i < questionresult.length; i++) {
            let userMessage = await DB.find("users", {"_id": DB.getObjectId(questionresult[i].user_id)});
            let questions_comments = await DB.find("questions_comments", {"questions_id": String(questionresult[i]._id)});
            let avatar = userMessage[0].avatar;
            questionresult[i].avatar = avatar;
            questionresult[i].comnum = questions_comments.length;
        }
        ctx.body = {
            code: 1,
            message: "问答模块查询成功",
            data: questionresult
        };
    } catch (e) {
        ctx.body = {
            code: -1,
            message: "问答模块查询失败",
            data: {}
        }
    }
});
//按热门排列问答列表
router.get("/questions-hot", async (ctx) => {
    try {
        let page = ctx.query.page || 1;
        let pageSize = 20;
        let questionresult = await DB.find("questions", {"is_hot":1}, {}, {
            page: page,
            pageSize: pageSize,
            sortJson: {"created_at": 1}
        });
        for (let i = 0; i < questionresult.length; i++) {
            let userMessage = await DB.find("users", {"_id": DB.getObjectId(questionresult[i].user_id)});
            let questions_comments = await DB.find("questions_comments", {"questions_id": String(questionresult[i]._id)});
            let avatar = userMessage[0].avatar;
            questionresult[i].avatar = avatar;
            questionresult[i].comnum = questions_comments.length;
        }
        ctx.body = {
            code: 1,
            message: "热门问答模块查询成功",
            data: questionresult
        };
    } catch (e) {
        ctx.body = {
            code: -1,
            message: "热门问答模块查询失败",
            data: {}
        }
    }
});
//按推荐排列问答
router.get("/questions-recommend", async (ctx) => {
    try {
        let page = ctx.query.page || 1;
        let pageSize = 20;
        let questionresult = await DB.find("questions", {"is_recommend":1}, {}, {
            page: page,
            pageSize: pageSize,
            sortJson: {"created_at": 1}
        });
        for (let i = 0; i < questionresult.length; i++) {
            let userMessage = await DB.find("users", {"_id": DB.getObjectId(questionresult[i].user_id)});
            let questions_comments = await DB.find("questions_comments", {"questions_id": String(questionresult[i]._id)});
            let avatar = userMessage[0].avatar;
            questionresult[i].avatar = avatar;
            questionresult[i].comnum = questions_comments.length;
        }
        ctx.body = {
            code: 1,
            message: "推荐问答模块查询成功",
            data: questionresult
        };
    } catch (e) {
        ctx.body = {
            code: -1,
            message: "推荐问答模块查询失败",
            data: {}
        }
    }
});

//获取问答具体内容
router.get("/questions", async (ctx) => {      //---->127.0.0.1/api/v1/code/code?id=5b0d593ffc0f8c0accd1ae7a
    try{
        let id=ctx.query.id;
        let result = await DB.find("questions", {"_id": DB.getObjectId(id)});
        let commentsResult = await DB.find("questions_comments",{"questions_id":String(id)});
        result[0].commentsNum=commentsResult.length;
        ctx.body={
            code:1,
            message:"问答具体内容查询成功",
            data:result
        };
    } catch (e) {
        ctx.body={
            code:-1,
            message:"问答具体内容查询失败",
            data:{}
        }
    }
});

//添加关注  用户之间：1:n
router.post("/questions-focus", async (ctx) => {
    try{
        let questionsUser_id =ctx.request.body.questionsUser_id;
        let user_id=ctx.request.body.user_id;
        let userResult=await DB.find("users",{"_id":DB.getObjectId(user_id)});
        userResult.focus.push(questionsUser_id);
        let addResult = await DB.update("users", {"_id":DB.getObjectId(user_id)},{
            "focus":userResult
        });
        ctx.body={
            code:1,
            message:"收藏成功",
            data:{}
        }
    } catch (e) {
        ctx.body={
            code:-1,
            message:"收藏失败",
            data:{}
        }
    }
});

//添加收藏
// router.post("/questions-collections", async (ctx) => {
//     try{
//         let code_id =ctx.request.body.questions_id;
//         let user_id=ctx.request.body.user_id;
//         let collectionResult=await DB.find("code",{"_id":code_id});
//         collectionResult.collections.push(user_id);
//         let addResult = await DB.update("code", {"_id":code_id},{
//             "collections":collectionResult
//         });
//         ctx.body={
//             code:1,
//             message:"收藏成功",
//             data:{}
//         }
//     } catch (e) {
//         ctx.body={
//             code:-1,
//             message:"收藏失败",
//             data:{}
//         }
//     }
// });




// //获取评论列表
// router.get("/code-comments", async (ctx) => {      //---->127.0.0.1/api/v1/code/code-comments?id=5b0d593ffc0f8c0accd1ae7a
//     try{
//         let id = ctx.query.id;  //项目的id
//         let commentsArray = await DB.find("code_comments", {});  //查找所有的评论
//         let codeCommentsArray = [];     //存放该项目下的所有评论
//         for (let i = 0; i < commentsArray.length; i++) {
//             if (id == commentsArray[i].code_id) {
//                 codeCommentsArray.push(commentsArray[i]);
//             }
//         }
//         // console.log(codeCommentsArray);
//
//         //根据评论的user_id找到所对应的用户
//         var userName = [];
//         for (let i = 0; i < codeCommentsArray.length; i++) {
//             userName.push(await DB.find("users", {"_id": DB.getObjectId(codeCommentsArray[i].user_id)})); //userName为评论者的数组
//         }
//         // console.log(userName);
//
//         ctx.body={
//             code:1,
//             message:"开源项目的评论查询成功",
//             data:{
//                 list: codeCommentsArray,
//                 userName: userName,
//             }
//         }
//     } catch (e) {
//         ctx.body={
//             code:-1,
//             message:"开源项目的评论查询失败",
//             data:{}
//         }
//     }
// });
//
// //发表评论
// router.post("/code-comments", async (ctx) => {
//     try{
//         let code_id =ctx.request.body.code_id;
//         let user_id=ctx.request.body.user_id;
//         let content=ctx.request.body.content;
//         let score=ctx.request.body.score;
//         let addResult = await DB.insert("code_comments", {
//             "code_id": code_id,
//             "user_id": user_id,
//             "content": content,
//             "score": parseInt(score),
//             "created_at": new Date(),
//         });
//         ctx.body={
//             code:1,
//             message:"评论添加成功",
//             data:{}
//         }
//     } catch (e) {
//         ctx.body={
//             code:-1,
//             message:"评论添加成功失败",
//             data:{}
//         }
//     }
// });


module.exports = router.routes();