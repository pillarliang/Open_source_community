const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/", async (ctx) => {
    ctx.body={
        code:1,
        message:"开源项目api接口",
        data:{}
    };
});

//获取项目分类
router.get("/code-classify", async (ctx) => {
    try{
        let classifyresult = await DB.find("code_classify",{});
        ctx.body={
            code:1,
            message:"开源项目分类",
            data:classifyresult
        };
    } catch (e) {
        ctx.body={
            code:-1,
            message:"开源项目分类查询失败",
            data:{}
        }
    }

});

//获取语言分类
router.get("/language-classify", async (ctx) => {
    try {
        let classifyresult = await DB.find("language_classify",{});
        ctx.body={
            code:1,
            message:"开源项目语言列表",
            data:classifyresult
        };
    } catch (e) {
        ctx.body={
            code:-1,
            message:"开源项目语言列表查询失败",
            data:{}
        }
    }

});

//获取项目列表
router.get("/codelist", async (ctx) => {
    try{
        let page=ctx.query.page || 1;
        let pageSize=20;
        let coderesult = await DB.find("code",{},{},{
            page:page,
            pageSize:pageSize,
            sortJson: {"created_at": 1}
        });
        ctx.body={
            code:1,
            message:"开源项目查询成功",
            data:coderesult
        };
    } catch (e) {
        ctx.body={
            code:-1,
            message:"开源项目查询失败",
            data:{}
        }
    }

});

router.get("/code-hot", async (ctx) => {
    try {
        let coderesult = await DB.find("code",{"is_hot":1});
        ctx.body={
            code:1,
            message:"热门开源项目",
            data:coderesult
        };
    } catch (e) {
        ctx.body={
            code:-1,
            message:"热门开源项目查询失败",
            data:{}
        }
    }

});

router.get("/codeTool-hot", async (ctx) => {
    try {
        let coderesult = await DB.find("code",{$or:[{'classify':'开发工具'},{'classify':'应用工具'}],"is_hot":1});  //热门软件如果需要，需要在数据库中增加一字段标识
        ctx.body={
            code:1,
            message:"热门开源软件",
            data:coderesult
        };
    } catch (e) {
        ctx.body={
            code:-1,
            message:"热门开源软件查询失败",
            data:{}
        }
    }

});

//获取具体项目内容
router.get("/code", async (ctx) => {      //---->127.0.0.1/api/v1/code/code?id=5b0d593ffc0f8c0accd1ae7a
    try{
        let id=ctx.query.id;
        let result = await DB.find("code", {"_id": DB.getObjectId(id)});
        ctx.body={
            code:1,
            message:"开源具体项目查询成功",
            data:result
        };
    } catch (e) {
        ctx.body={
            code:-1,
            message:"开源具体项目查询失败",
            data:{}
        }
    }
});

//添加收藏
router.post("/code-collections", async (ctx) => {
    try{
        let code_id =ctx.request.body.code_id;
        let user_id=ctx.request.body.user_id;
        let collectionResult=await DB.find("code",{"_id":code_id});
        collectionResult.collections.push(user_id);
        let addResult = await DB.update("code", {"_id":code_id},{
            "collections":collectionResult
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

//获取评论列表
router.get("/code-comments", async (ctx) => {      //---->127.0.0.1/api/v1/code/code-comments?id=5b0d593ffc0f8c0accd1ae7a
    try{
        let id = ctx.query.id;  //项目的id
        let commentsArray = await DB.find("code_comments", {});  //查找所有的评论
        let codeCommentsArray = [];     //存放该项目下的所有评论
        for (let i = 0; i < commentsArray.length; i++) {
            if (id == commentsArray[i].code_id) {
                codeCommentsArray.push(commentsArray[i]);
            }
        }
        // console.log(codeCommentsArray);

        //根据评论的user_id找到所对应的用户
        var userName = [];
        for (let i = 0; i < codeCommentsArray.length; i++) {
            userName.push(await DB.find("users", {"_id": DB.getObjectId(codeCommentsArray[i].user_id)})); //userName为评论者的数组
        }
        // console.log(userName);

        ctx.body={
            code:1,
            message:"开源项目的评论查询成功",
            data:{
                list: codeCommentsArray,
                userName: userName,
            }
        }
    } catch (e) {
        ctx.body={
            code:-1,
            message:"开源项目的评论查询失败",
            data:{}
        }
    }
});

//发表评论
router.post("/code-comments", async (ctx) => {    
    try{
        let code_id =ctx.request.body.code_id;
        let user_id=ctx.request.body.user_id;
        let content=ctx.request.body.content;
        let score=ctx.request.body.score;
        let addResult = await DB.insert("code_comments", {
            "code_id": code_id,
            "user_id": user_id,
            "content": content,
            "score": parseInt(score),
            "created_at": new Date(),
        });
        ctx.body={
            code:1,
            message:"评论添加成功",
            data:{}
        }
    } catch (e) {
        ctx.body={
            code:-1,
            message:"评论添加成功失败",
            data:{}
        }
    }
});



module.exports = router.routes();