const router = require("koa-router")();
const login = require("./admin/login.js");
const user = require("./admin/user.js");
const index = require("./admin/index.js");
const classify= require("./admin/classify.js");
const focus= require("./admin/focus.js");
const link= require("./admin/link.js");
const unit= require("./admin/unit.js");
const nav= require("./admin/nav.js");
const blog= require("./admin/blog.js");
const code= require("./admin/code.js");
const questions= require("./admin/questions.js");
const url = require("url");

router.use(async (ctx, next) => {
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;
    let pathname = url.parse(ctx.request.url).pathname.substring(1);
    //左侧菜单栏选中
    let splitUrl = pathname.split("/");
    // console.log(splitUrl);
    ctx.state.G = {
        url: splitUrl,
        userinfo: ctx.session.userinfo,
        prevPage:ctx.request.headers["referer"]
    };
    //权限判断
    if (ctx.session.userinfo) {
        await next();
    } else {
        if (pathname == "admin/login" || pathname == "admin/login/dologin" || pathname == "admin/login/code") {
            await next();
        } else {
            ctx.redirect("/admin/login");
        }
    }
});
router.get("/", async (ctx) => {
    ctx.render("admin/index");
});

router.use(index);
router.use("/login", login);
router.use("/user", user);
router.use("/classify", classify);
router.use("/focus", focus);
router.use("/link", link);
router.use("/unit", unit);
router.use("/nav", nav);
router.use("/blog", blog);
router.use("/code", code);
router.use("/questions", questions);

module.exports = router.routes();