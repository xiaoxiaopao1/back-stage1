const Koa = require('koa'),
      app = new Koa(),
      KoaRouter = require('koa-router'),
      router = new KoaRouter(),
      koaBody = require('koa-body'),
      mongoose = require('mongoose'),
      getUserData = require('./Control/user'),
      article = require('./Control/article'); 


mongoose.connect('mongodb://localhost:27017/backStage',{useMongoClient:true});


app.use(koaBody({multipart: true}));  

//用户信息
router.get('/api/login', getUserData);

// 接收post过来的文章
router.post('/api/addArticle',article.addArticle);

// 输出文章列表
router.get('/api/articleList',article.articleList);

// post单篇文章
router.post('/api/findArticle',article.findArticle);

// 删除文章
router.post('/api/delArticle',article.delArticle);

// 更新文章
router.post('/api/updateArticle',article.updateArticle);

// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);
