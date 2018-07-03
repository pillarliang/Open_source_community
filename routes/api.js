const router = require("koa-router")();
const DB = require("../model/db.js");
const code= require("./api/code.js");
const questions= require("./api/questions.js");
const url = require("url");

// router.use(async (ctx, next) => {
//     ctx.state.__HOST__ = "http://" + ctx.request.header.host;
//     let pathname = url.parse(ctx.request.url).pathname.substring(1);
//     //左侧菜单栏选中
//     let splitUrl = pathname.split("/");
//     // console.log(splitUrl);
//     ctx.state.G = {
//         url: splitUrl,
//         userinfo: ctx.session.userinfo,
//         prevPage:ctx.request.headers["referer"]
//     };
//     //权限判断
//     if (ctx.session.userinfo) {
//         await next();
//     } else {
//         if (pathname == "api/login" || pathname == "api/login/dologin" || pathname == "api/login/code") {
//             await next();
//         } else {
//             ctx.redirect("/api/login");
//         }
//     }
// });
router.get("/", async (ctx) => {
    ctx.body("api/index");
});

router.use("/code", code);
router.use("/questions", questions);

router.get("/link", async (ctx)=>{
    try{
        console.log(0);
        let linksResult = await DB.find("link",{"state":1});
        console.log(linksResult);
        ctx.body={
            code:1,
            message:"友情链接成功",
            data:linksResult
        }
    } catch (e) {
        ctx.body={
            code:0,
            message:"友情链接失败",
            data:{}
        }
    }

});
router.get("/unit", async (ctx)=>{
    try{
        console.log(0);
        let linksResult = await DB.find("unit",{"state":1});
        console.log(linksResult);
        ctx.body={
            code:1,
            message:"合作单位查询成功",
            data:linksResult
        }
    } catch (e) {
        ctx.body={
            code:0,
            message:"合作单位查询失败",
            data:{}
        }
    }

});
module.exports = router.routes();