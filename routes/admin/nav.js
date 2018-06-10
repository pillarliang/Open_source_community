const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/", async (ctx) => {
    let page = 1;
    let pageSize = 100;
    let count = await DB.count("nav", {});
    let result = await DB.find("nav", {}, {}, {
        page: page,
        pageSize: pageSize,
        sortJson: {"sort": 1}
    });
    await ctx.render("admin/nav/nav-list", {
        list: result,
        listNum: count,
    });
});

router.get("/nav-add", async (ctx) => {
    let sort = await DB.find("nav", {});
    let sortArry = new Array();
    for (let i = 0; i < sort.length; i++) {
        sortArry[i] = sort[i].sort;
    }
    await ctx.render("admin/nav/nav-add", {
        sort: sortArry,
    });
});

router.post("/nav-add", async (ctx) => {
    try {
        let title = ctx.request.body.title;
        let url = ctx.request.body.url;
        let sort = ctx.request.body.sort;
        console.log(title);
        console.log(url);
        console.log(sort);
        // console.log(state);
        let addResult = await await DB.insert("nav", {
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


router.get("/nav-edit", async (ctx) => {
    let sort = await DB.find("nav", {});
    // console.log(sort);
    let sortArry = new Array();
    for (let i = 0; i < sort.length; i++) {
        sortArry[i] = sort[i].sort;
    }
    let id = ctx.query.id;
    let result = await DB.find("nav", {"_id": DB.getObjectId(id)});
    console.log(sortArry);
    await ctx.render('admin/nav/nav-edit', {
        list: result[0],
        prevPage: ctx.state.G.prevPage,
        sort: sortArry,
    });
});

router.post('/nav-doedit', async (ctx) => {
    try {
        let id = ctx.request.body.id;
        let title = ctx.request.body.title;
        let url = ctx.request.body.url;
        let sort = ctx.request.body.sort;

        let updateResult = await DB.update('nav', {"_id": DB.getObjectId(id)}, {
            "title": title,
            "url": url,
            "sort": parseInt(sort),
        });
        ctx.body = "修改成功";
    } catch (e) {
        ctx.body = "修改失败";
    }
});

module.exports = router.routes();