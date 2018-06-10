const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/", async (ctx) => {
    let page = 1;
    let pageSize = 100;
    let count = await DB.count("questions", {});
    let result = await DB.find("questions", {}, {}, {
        page: page,
        pageSize: pageSize,
        sortJson: {"created_at": 1}
    });
    let classifyresult = await DB.find("questions_classify", {});
    await ctx.render("admin/questions/questions-list", {
        list: result,
        listNum: count,
        classify: classifyresult,
    });
});

router.get("/questions-add", async (ctx) => {
    let sort = await DB.find("nav", {});
    // console.log(sort);
    let sortArry = new Array();
    for (let i = 0; i < sort.length; i++) {
        sortArry[i] = sort[i].sort;
    }
    await ctx.render("admin/questions/questions-add", {
        sort: sortArry,
    });
});

router.post("/questions-add", async (ctx) => {
    try {
        let title = ctx.request.body.title;
        let url = ctx.request.body.url;
        let sort = ctx.request.body.sort;
        console.log(title);
        console.log(url);
        console.log(sort);
        // console.log(state);
        let addResult = await await DB.insert("questions", {
            "title": title,
            "url": url,
            "sort": parseInt(sort),
            "created_at": new Date(),
        });
        ctx.body = {
            code: 200,
            messgae: "添加成功"
        }
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }

});

router.post("/questions-search", async (ctx) => {
    try {
        let classify = ctx.request.body.classify;
        console.log(classify);
        // console.log(state);
        let searchResult = await DB.find("questions", {"classify": classify,});
        let classifyresult = await DB.find("questions_classify", {});
        console.log(classifyresult);
        await ctx.render("admin/questions/questions-list", {
            list: searchResult,
            classify: classifyresult,
        });
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});

router.get("/questions-content", async (ctx) => {
    let id = ctx.query.id;
    let result = await DB.find("questions", {"_id": DB.getObjectId(id)});
    await ctx.render("admin/questions/questions-content", {
        list: result[0],
    });
});

router.get("/questions-comments", async (ctx) => {
    let id = ctx.query.id;  //问答的id
    let questionsTitle = ctx.query.title;    //问答的标题
    // let questionsTitle = await DB.find("questions", {"_id": DB.getObjectId(id)});         //避免查询数据库，从query中传参
    let commentsArray = await DB.find("questions_comments", {});  //查找所有的评论
    let questionsCommentsArray = [];     //存放该博客下的所有评论
    for (let i = 0; i < commentsArray.length; i++) {
        if (id == commentsArray[i].questions_id) {
            questionsCommentsArray.push(commentsArray[i]);
        }
    }
    console.log(questionsCommentsArray);

    //根据评论的user_id找到所对应的用户
    var userName = [];
    for (let i = 0; i < questionsCommentsArray.length; i++) {
        userName.push(await DB.find("users", {"_id": DB.getObjectId(questionsCommentsArray[i].user_id)})); //userName为评论者的数组
    }
    console.log(userName);

    // let result = await DB.find("comments", {"": DB.getObjectId(id)}, {"comments": 1});
    // let userResult =await DB.find("users",{"_id":DB.getObjectId(result[0].uid})
    await ctx.render("admin/questions/questions-comments", {
        list: questionsCommentsArray,
        questionsTitle: questionsTitle,
        userName: userName,
    });
});

router.get("/questions-edit", async (ctx) => {
    try {
        let sort = await DB.find("nav", {});
        // console.log(sort);
        let sortArry = new Array();
        for (let i = 0; i < sort.length; i++) {
            sortArry[i] = sort[i].sort;
        }
        let id = ctx.query.id;
        let result = await DB.find("questions", {"_id": DB.getObjectId(id)});
        let classifyresult = await DB.find("questions_classify", {});
        // console.log(classifyresult);
        await ctx.render('admin/questions/questions-edit', {
            list: result[0],
            prevPage: ctx.state.G.prevPage,
            sort: sortArry,
            classify: classifyresult,
        });
    } catch (e) {
        ctx.body = "页面出错";
    }

});

router.post('/questions-doedit', async (ctx) => {
    try {
        let id = ctx.request.body.id;
        let title = ctx.request.body.title;
        let classify = ctx.request.body.classify;
        let sort = ctx.request.body.sort;
        let label = ctx.request.body.label;

        let updateResult = await DB.update('questions', {"_id": DB.getObjectId(id)}, {
            "title": title,
            "label": label,
            "classify": classify,
            "sort": parseInt(sort),
        });
        ctx.body = "修改成功";
    } catch (e) {
        ctx.body = "修改失败";
    }
});

module.exports = router.routes();