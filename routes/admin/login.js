const router = require('koa-router')();
const tools = require('../../model/tools.js');
const DB = require('../../model/db.js');

router.get('/',async (ctx)=>{
    await ctx.render('admin/login');
});

//post
router.post('/dologin',async (ctx)=>{
    console.log(ctx.request.body);  //{ username: 'admin', password: '123456' }
    let username=ctx.request.body.username;
    let password=ctx.request.body.password;
    var result=await DB.find('users',{"username":username,"password":tools.md5(password)});
    console.log(result);
    if(result[0]&&result[0].state==1){
        //console.log('成功');
        console.log(result);
        ctx.session.userinfo=result[0];
        ctx.redirect(ctx.state.__HOST__+'/admin');
    }else{
        ctx.render('admin/error',{
            message:'用户名或者密码错误',
            redirect: ctx.state.__HOST__+'/admin/login'
        });
    }
});

router.get('/loginout',async (ctx)=>{
    ctx.session.userinfo=null;
    ctx.redirect(ctx.state.__HOST__+"/admin/login");
});

module.exports=router.routes();