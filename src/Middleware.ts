import { NavigationGuardNext, RawLocation, Route, RouteRecord } from 'vue-router/types/router'
import Vue, { ComponentOptions } from 'vue'
import VueRouter from 'vue-router'

export type Payload<V extends Vue = Vue> = {
  to: Route,
  from: Route,
  next: NavigationGuardNext<V>,
  router: VueRouter,
  app: ComponentOptions<V>
}
export type RouterGuardPayload<V extends Vue = Vue> = {
  to: Route,
  from: Route,
  next: NavigationGuardNext<V>,
  router: VueRouter,
  app: ComponentOptions<V>
}

export type HandleResult = { abort: boolean } & RawLocation | false | undefined

export abstract class Middleware<V extends Vue = Vue> {
  abstract handle (data: Payload): Promise<HandleResult>;
}

export async function handleMiddlewares<V extends Vue = Vue>
({
   to,
   from,
   next,
   app,
   router
 }: RouterGuardPayload) {
  const middlewareList = to.matched.flatMap((options: RouteRecord) => options.meta?.middleware || [])
  let resultLocation = undefined

  console.log('beforeEach middlewareList', middlewareList, to.name)
  if (!Array.isArray(middlewareList)) {
    console.error('Middleware should be an array')
    return
  }

  for (const middleware of middlewareList) {
    if (middleware instanceof Middleware) {
      const result = await middleware.handle({
        to,
        from,
        next,
        app,
        router
      })

      if ((typeof result === 'object' && result.abort)) {
        next(result)
        break
      }
      if (result === false) {
        next(false)
        break
      }
      resultLocation = result
    }
    else {
      console.error('Middleware should be an instance of Middleware class')
    }
  }

  next(resultLocation)
}
