const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/", async (ctx) => {
    let page = ctx.query.page || 1;
    let pageSize = 15;
    let count = await DB.count("code", {});
    let result = await DB.find("code", {}, {}, {
        page: page,
        pageSize: pageSize,
        sortJson: {"created_at": 1}
    });
    let classifyresult = await DB.find("code_classify",{});
    await ctx.render("admin/code/code-list", {
        list: result,
        listNum: count,
        classify:classifyresult,
        page: page,
        totalPages: Math.ceil(count / pageSize)
    });
});

router.get("/code-add", async (ctx) => {
    let sort = await DB.find("nav", {});
    // console.log(sort);
    let sortArry = new Array();
    for (let i = 0; i < sort.length; i++) {
        sortArry[i] = sort[i].sort;
    }
    await ctx.render("admin/code/code-add", {
        sort: sortArry,
    });
});

router.post("/code-add", async (ctx) => {
    try {
        let title = ctx.request.body.title;
        let url = ctx.request.body.url;
        let sort = ctx.request.body.sort;
        console.log(title);
        console.log(url);
        console.log(sort);
        // console.log(state);
        let addResult = await DB.insert("code", {
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

router.post("/code-search", async (ctx) => {
    try {
        let classify = ctx.request.body.classify;
        console.log(classify);
        // console.log(state);
        let searchResult = await DB.find("code", {"classify": classify,});
        let classifyresult = await DB.find("code_classify",{});
        console.log(classifyresult);
        await ctx.render("admin/code/code-list", {
            list: searchResult,
            classify:classifyresult,
        });
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});

router.get("/code-content", async (ctx) => {
    let id = ctx.query.id;
    let result = await DB.find("code", {"_id": DB.getObjectId(id)});
    await ctx.render("admin/code/code-content", {
        list: result[0],
    });
});

router.get("/code-comments", async (ctx) => {
    let id = ctx.query.id;  //博客的id
    let codeTitle = ctx.query.title;    //博客的标题
    // let blogTitle = await DB.find("blog", {"_id": DB.getObjectId(id)});         //避免查询数据库，从query中传参
    let commentsArray = await DB.find("code_comments", {});  //查找所有的评论
    let codeCommentsArray = [];     //存放该博客下的所有评论
    for (let i = 0; i < commentsArray.length; i++) {
        if (id == commentsArray[i].code_id) {
            codeCommentsArray.push(commentsArray[i]);
        }
    }
    console.log(codeCommentsArray);

    //根据评论的user_id找到所对应的用户
    var userName = [];
    for (let i = 0; i < codeCommentsArray.length; i++) {
        userName.push(await DB.find("users", {"_id": DB.getObjectId(codeCommentsArray[i].user_id)})); //userName为评论者的数组
    }
    console.log(userName);

    // let result = await DB.find("comments", {"": DB.getObjectId(id)}, {"comments": 1});
    // let userResult =await DB.find("users",{"_id":DB.getObjectId(result[0].uid})
    await ctx.render("admin/blog/blog-comments", {
        list: codeCommentsArray,
        blogTitle: codeTitle,
        userName: userName,
    });
});

router.get("/code-edit", async (ctx) => {
    try {
        let sort = await DB.find("nav", {});
        // console.log(sort);
        let sortArry = new Array();
        for (let i = 0; i < sort.length; i++) {
            sortArry[i] = sort[i].sort;
        }
        let id = ctx.query.id;
        let result = await DB.find("code", {"_id": DB.getObjectId(id)});
        let classifyresult = await DB.find("code_classify",{});
        let languageresult = await DB.find("language_classify",{});
        // console.log(languageresult);
        await ctx.render('admin/code/code-edit', {
            list: result[0],
            prevPage: ctx.state.G.prevPage,
            sort: sortArry,
            classify: classifyresult,
            language:languageresult,
        });
    } catch (e) {
        ctx.body="页面出错";
    }

});

router.post('/code-doedit', async (ctx) => {
    try {
        let id = ctx.request.body.id;
        let title = ctx.request.body.title;
        let classify = ctx.request.body.classify;
        // let language = ctx.request.body.language;
        let sort = ctx.request.body.sort;
        let label = ctx.request.body.label;
        console.log(language);

        let updateResult = await DB.update('code', {"_id": DB.getObjectId(id)}, {
            "title": title,
            "label": label,
            "classify":classify,
            // "language":language,
            "sort": parseInt(sort),
        });
        ctx.body = "修改成功";
    } catch (e) {
        ctx.body = "修改失败";
    }
});

module.exports = router.routes();