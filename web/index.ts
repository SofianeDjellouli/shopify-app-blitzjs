/* eslint-disable no-console */
import dotenv from 'dotenv'
import Koa from 'koa'
import Router from 'koa-router'
import next from 'next'
import createShopifyAuth, { verifyRequest } from '@shopify/koa-shopify-auth'
import Shopify, { ApiVersion, ContextParams } from '@shopify/shopify-api'

const init = async () => {
  dotenv.config()

  const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SCOPES, HOST, PORT, NODE_ENV } =
    process.env

  const dev = NODE_ENV !== 'production'

  const app = next({ dev })

  const handle = app.getRequestHandler()


  const contextParams: ContextParams = {
    API_KEY: SHOPIFY_API_KEY as string,
    API_SECRET_KEY: SHOPIFY_API_SECRET as string,
    SCOPES: (SCOPES as string).split(','),
    HOST_NAME: (HOST as string).replace(/https:\/\/|\/$/g, ''),
    API_VERSION: '2022-04' as ApiVersion.January22,
    IS_EMBEDDED_APP: true,
    // This should be replaced with your preferred storage strategy
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
  }

  Shopify.Context.initialize(contextParams)

  // Storing the currently active shops in memory will force them to re-login when your server restarts. You should
  // persist this object in your app.
  const ACTIVE_SHOPIFY_SHOPS: { [key in string]: string } = {}

  Shopify.Webhooks.Registry.addHandler('APP_UNINSTALLED', {
    path: '/webhooks',
    webhookHandler: async (_, shop) => {
      delete ACTIVE_SHOPIFY_SHOPS[shop]
    },
  })

  await app.prepare()

  const server = new Koa()

  const router = new Router()

  server.keys = [Shopify.Context.API_SECRET_KEY]

  const shopifyAuth = createShopifyAuth({
    async afterAuth(ctx) {
      // Access token and shop available in ctx.state.shopify

      const {
        shop,
        accessToken,
        scope,
      }: {
        [key in 'shop' | 'accessToken' | 'scope']: string
      } = ctx.state.shopify

      const host = ctx.query.host

      ACTIVE_SHOPIFY_SHOPS[shop] = scope

      const responses = await Shopify.Webhooks.Registry.register({
        shop,
        accessToken,
        path: '/webhooks',
        topic: 'APP_UNINSTALLED',
      })

      if (!responses['APP_UNINSTALLED']?.success) {
        console.log(
          `Failed to register APP_UNINSTALLED webhook: ${responses.result}`,
        )
      }

      // Redirect to app with shop parameter upon auth
      ctx.redirect(`/?shop=${shop}&host=${host}`)
    },
  })

  const handleRequest = async (ctx: Koa.Context) => {
    await handle(ctx.req, ctx.res)

    ctx.respond = false

    ctx.res.statusCode = 200
  }

  router.post('/webhooks', async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res)

      console.log(`Webhook processed, returned status code 200`)
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`)
    }
  })

  router.post(
    '/graphql',
    verifyRequest({ returnHeader: true }),
    async (ctx) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res)
    },
  )

  router.get('(/_next/static/.*)', handleRequest) // Static content is clear

  router.get('/_next/webpack-hmr', handleRequest) // Webpack content is clear

  const defaultHandler = async (ctx: Koa.Context) => {
    const { shop } = ctx.query

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (typeof shop === 'string' && ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`)
    } else {
      await handleRequest(ctx)
    }
  }


  router.post('/api/(.*)', defaultHandler)

  router.get('(.*)', defaultHandler)

  server
    .use(shopifyAuth)
    .use(router.allowedMethods())
    .use(router.routes())
    .listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`))
}

init()
