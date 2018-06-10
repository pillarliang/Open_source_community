const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");
const path = require("path");


router.get("/", async (ctx) => {
    let page = ctx.query.page || 1;
    let pageSize = 5;
    let count = await DB.count("focus", {});
    let result = await DB.find("focus", {}, {}, {
        page: page,
        pageSize: pageSize,
    });
    await ctx.render("admin/focus/focus-list", {
        list: result,
        listNum: count,
        page: page,
        totalPages: Math.ceil(count / pageSize),
    });
});

router.get("/focus-add", async (ctx) => {
    await ctx.render("admin/focus/focus-add");
});

router.post("/focus-doadd", tools.multer().single('pic'), async (ctx) => {
    try {
        var title = ctx.req.body.title;
        let pic = ctx.req.file ? ctx.req.file.path.substr(7) : '';
        var url = ctx.req.body.url;
        var sort = ctx.req.body.sort;
        var state = ctx.req.body.state;
        console.log(title);
        console.log(pic);
        console.log(url);
        console.log(sort);
        console.log(state);
        await  DB.insert('focus', {
            "title": title,
            "pic": pic,
            "url": url,
            "sort": sort,
            "state": state,
            "created_at": new Date(),
        });
        ctx.body = "添加成功";
    } catch (e) {
        ctx.body = "添加失败";
    }

});

// router.post("/focus-doadd", async (ctx) => {
//     try {
//         let formdata = ctx.request.body.formData;
//         console.log(formdata);
//         // let identification = ctx.request.body.identification;
//         let addResult = await DB.insert("blog_classify", formdata);
//
//         ctx.body = {
//             code: 200,
//             messgae: "添加成功"
//         }
//     } catch (err) {
//         ctx.body = {
//             code: 401,
//             message: "添加失败"
//         }
//     }
// });

router.get("/focus-edit", async (ctx) => {
    let id = ctx.query.id;
    let result = await DB.find("focus", {"_id": DB.getObjectId(id)});
    await ctx.render('admin/focus/focus-edit', {
        list: result[0],
        prevPage: ctx.state.G.prevPage
    });
});

router.post('/focus-doedit', tools.multer().single('pic'), async (ctx) => {
    try {
        let id = ctx.req.body.id;
        let title = ctx.req.body.title;
        // let thepic=await DB.find("focus",{"_id": DB.getObjectId(id)});
        let pic = ctx.req.file ? ctx.req.file.path.substr(7) : " ";
        let url = ctx.req.body.url;
        let sort = ctx.req.body.sort;
        let state = ctx.req.body.state;
        // let prevPage = ctx.req.body.prevPage;
        console.log(title);
        console.log(pic);
        console.log(url);
        console.log(sort);
        console.log(state);
        let updateResult = await DB.update('focus', {"_id": DB.getObjectId(id)}, {
            "title": title,
            "pic": pic,
            "url": url,
            "sort": sort,
            "state": state,
        });
        ctx.body = "修改成功";
        // if(prevPage){
        //     ctx.redirect(prevPage);
        // }else{
        //     ctx.redirect(ctx.state.__HOST__+"/admin/focus");
        // }
    } catch (e) {
        ctx.body = "修改失败";
    }
});

module.exports = router.routes();