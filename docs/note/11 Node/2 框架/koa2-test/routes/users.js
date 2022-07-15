const router = require('koa-router')()

router.get('/user', async (ctx, next) => {
  ctx.body = 'user'
})

module.exports = router
