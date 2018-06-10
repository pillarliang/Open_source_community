const router = require("koa-router")();
const DB = require("../../model/db.js");
const tools = require("../../model/tools.js");

router.get("/blog", async (ctx) => {
    var page=1;
    var pageSize=100;
    var result=await DB.find('blog_classify',{},{},{
        page:page,
        pageSize:pageSize,
        sortJson:{"created_at":-1}
    });
    ctx.render("admin/classify/classify-list", {
        list: result,
        bc: "blog",
    });
});
router.get("/blog-add", async (ctx) => {
    let identresult = await DB.find("blog_classify", {});
    let identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].identification;
    }
    await ctx.render("admin/classify/classify-add", {
        identification: identArry,
        bc: "blog",
    });
});
router.post("/blog-add", async (ctx) => {
    try {
        let name = ctx.request.body.name;
        let identification = ctx.request.body.identification;
        let addResult = await DB.insert("blog_classify", {
            "name": name,
            "identification": identification,
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
router.get("/blog-edit", async (ctx) => {
    var identresult = await DB.find("blog_classify", {});
    var identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        identArry[i] = identresult[i].identification;
    }
    let id = ctx.query.id;
    let result = await DB.find("blog_classify", {"_id": DB.getObjectId(id)});
    await ctx.render("admin/classify/classify-edit", {
        list: result[0],
        bc: "blog",
        identification: identArry,
    });
});
router.post("/blog-doedit", async (ctx) => {
    try {
        let id = ctx.request.body.id;
        let name = ctx.request.body.name;
        let identification = ctx.request.body.identification;
        console.log(identification);
        console.log(name);

        let updateResult = await DB.update("blog_classify", {"_id": DB.getObjectId(id)}, {
            "name": name,
            "identification": identification
        });
        console.log("插入成功");
        ctx.body = {
            code: 200,
            message: "修改成功"
        }
    } catch (err) {
        ctx.body = {
            code: 404,
            message: "修改失败"
        }
    }
});

router.get("/code", async (ctx) => {
    var page=1;
    var pageSize=100;
    var result=await DB.find('code_classify',{},{},{
        page:page,
        pageSize:pageSize,
        sortJson:{"identification":-1}
    });
    ctx.render("admin/classify/classify-list", {
        list: result,
        bc: "code",
    });
});
router.get("/code-add", async (ctx) => {
    var identresult = await DB.find("code_classify", {});
    // console.log(identresult.length);
    // console.log(identresult);
    var identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        // console.log(identresult[i].identification);
        identArry[i] = identresult[i].identification;
        // console.log(identArry[i]);
    }
    console.log(identArry);
    await ctx.render("admin/classify/classify-add", {
        theidentArry: identArry,
        bc: "code",
    });
});
router.post("/code-add", async (ctx) => {
    console.log(ctx.request.body);
    try {
        let name = ctx.request.body.name;
        let identification = ctx.request.body.identification;
        let addResult = await DB.insert("code_classify", {"name": name, "identification": parseInt(identification),"created_at": new Date()});
        ctx.body = {
            code: 200,
            meessgae: "添加成功"
        }
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});
router.get("/code-edit", async (ctx) => {
    let id = ctx.query.id;
    let result = await DB.find("code_classify", {"_id": DB.getObjectId(id)});
    await ctx.render("admin/classify/classify-edit", {
        list: result[0],
        bc: "code",
    });
});
router.post("/code-doedit", async (ctx) => {
    try {
        let id = ctx.request.body.id;
        let name = ctx.request.body.name;
        let identification = ctx.request.body.identification;
        console.log(identification);
        console.log(name);

        let updateResult = await DB.update("code_classify", {"_id": DB.getObjectId(id)}, {
            "name": name,
            "identification": identification
        });
        console.log("插入成功");
        ctx.body = {
            code: 200,
            message: "修改成功"
        }
    } catch (err) {
        ctx.body = {
            code: 404,
            message: "修改失败"
        }
    }
});

router.get("/language", async (ctx) => {
    var page=1;
    var pageSize=100;
    var result=await DB.find('language_classify',{},{},{
        page:page,
        pageSize:pageSize,
        sortJson:{"identification":-1}
    });
    ctx.render("admin/classify/classify-list", {
        list: result,
        bc: "language",
    });
});
router.get("/language-add", async (ctx) => {
    var identresult = await DB.find("language_classify", {});
    // console.log(identresult.length);
    // console.log(identresult);
    var identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        // console.log(identresult[i].identification);
        identArry[i] = identresult[i].identification;
        // console.log(identArry[i]);
    }
    console.log(identArry);
    await ctx.render("admin/classify/classify-add", {
        theidentArry: identArry,
        bc: "language",
    });
});
router.post("/language-add", async (ctx) => {
    console.log(ctx.request.body);
    try {
        let name = ctx.request.body.name;
        let identification = ctx.request.body.identification;
        let addResult = await DB.insert("language_classify", {"name": name, "identification": parseInt(identification),"created_at": new Date()});
        ctx.body = {
            code: 200,
            meessgae: "添加成功"
        }
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});
router.get("/language-edit", async (ctx) => {
    let id = ctx.query.id;
    let result = await DB.find("language_classify", {"_id": DB.getObjectId(id)});
    await ctx.render("admin/classify/classify-edit", {
        list: result[0],
        bc: "language",
    });
});
router.post("/language-doedit", async (ctx) => {
    try {
        let id = ctx.request.body.id;
        let name = ctx.request.body.name;
        let identification = ctx.request.body.identification;
        console.log(identification);
        console.log(name);

        let updateResult = await DB.update("language_classify", {"_id": DB.getObjectId(id)}, {
            "name": name,
            "identification": identification
        });
        console.log("插入成功");
        ctx.body = {
            code: 200,
            message: "修改成功"
        }
    } catch (err) {
        ctx.body = {
            code: 404,
            message: "修改失败"
        }
    }
});

router.get("/questions", async (ctx) => {
    var page=1;
    var pageSize=100;
    var result=await DB.find('questions_classify',{},{},{
        page:page,
        pageSize:pageSize,
        sortJson:{"identification":-1}
    });
    ctx.render("admin/classify/classify-list", {
        list: result,
        bc: "questions",
    });
});
router.get("/questions-add", async (ctx) => {
    var identresult = await DB.find("questions_classify", {});
    // console.log(identresult.length);
    // console.log(identresult);
    var identArry = new Array();
    for (let i = 0; i < identresult.length; i++) {
        // console.log(identresult[i].identification);
        identArry[i] = identresult[i].identification;
        // console.log(identArry[i]);
    }
    console.log(identArry);
    await ctx.render("admin/classify/classify-add", {
        theidentArry: identArry,
        bc: "questions",
    });
});
router.post("/questions-add", async (ctx) => {
    console.log(ctx.request.body);
    try {
        let name = ctx.request.body.name;
        let identification = ctx.request.body.identification;
        let addResult = await DB.insert("questions_classify", {"name": name, "identification": identification,"created_at": new Date()});
        ctx.body = {
            code: 200,
            meessgae: "添加成功"
        }
    } catch (err) {
        ctx.body = {
            code: 401,
            message: "添加失败"
        }
    }
});
router.get("/questions-edit", async (ctx) => {
    let id = ctx.query.id;
    let result = await DB.find("questions_classify", {"_id": DB.getObjectId(id)});
    await ctx.render("admin/classify/classify-edit", {
        list: result[0],
        bc: "questions",
    });
});
router.post("/questions-doedit", async (ctx) => {
    try {
        let id = ctx.request.body.id;
        let name = ctx.request.body.name;
        let identification = ctx.request.body.identification;
        console.log(identification);
        console.log(name);

        let updateResult = await DB.update("questions_classify", {"_id": DB.getObjectId(id)}, {
            "name": name,
            "identification": identification
        });
        console.log("插入成功");
        ctx.body = {
            code: 200,
            message: "修改成功"
        }
    } catch (err) {
        ctx.body = {
            code: 404,
            message: "修改失败"
        }
    }
});

module.exports = router.routes();