const router =require("koa-router")();

router.get("/",async (ctx)=>{
   ctx.body="前端小伙伴还没完工，暂时么有页面哦";
});

module.exports=router.routes();
