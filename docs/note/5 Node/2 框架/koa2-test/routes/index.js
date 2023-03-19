const router = require('koa-router')()

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('index', {title: ctx.state});
})

module.exports = router
