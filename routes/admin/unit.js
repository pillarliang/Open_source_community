const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/", async (ctx) => {
    let page = 1;
    let pageSize = 100;
    let count = await DB.count("unit", {});
    let result = await DB.find("unit", {}, {}, {
        page: page,
        pageSize: pageSize,
        sortJson: {"sort": 1}
    });
    await ctx.render("admin/unit/unit-list", {
        list: result,
        listNum: count,
    });
});

router.get("/unit-add", async (ctx) => {
    let sort = await DB.find("unit", {});
    // console.log(sort);
    let sortArry = new Array();
    for (let i = 0; i < sort.length; i++) {
        sortArry[i] = sort[i].sort;
    }
    await ctx.render("admin/unit/unit-add", {
        sort: sortArry,
    });
});

router.post("/unit-add", async (ctx) => {
    try {
        let title = ctx.request.body.title;
        let url = ctx.request.body.url;
        let sort = ctx.request.body.sort;
        let addResult = await DB.insert("unit", {
            "title": title,
            "url": url,
            "sort": parseInt(sort),
            "created_at": new Date(),
        });
        // console.log(addResult);
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


router.get("/unit-edit", async (ctx) => {
    let sort = await DB.find("unit", {});
    // console.log(sort);
    let sortArry = new Array();
    for (let i = 0; i < sort.length; i++) {
        sortArry[i] = sort[i].sort;
    }
    let id = ctx.query.id;
    let result = await DB.find("unit", {"_id": DB.getObjectId(id)});
    await ctx.render('admin/unit/unit-edit', {
        list: result[0],
        prevPage: ctx.state.G.prevPage,
        sort: sortArry,
    });
});

router.post('/unit-doedit', async (ctx) => {
    try {
        let id = ctx.request.body.id;
        let title = ctx.request.body.title;
        let url = ctx.request.body.url;
        let sort = ctx.request.body.sort;

        let updateResult = await DB.update('unit', {"_id": DB.getObjectId(id)}, {
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