import { NavigationGuardNext, RouteRecord } from 'vue-router'
import Vue, { ComponentOptions } from 'vue'
import  {Router} from 'vue-router'
type RawLocation = any
type Route = any
export type { CustomRouteConfig } from './CustomRouteConfig'

export type Payload = {
  to: Route,
  from: Route,
  next: NavigationGuardNext,
  router: Router,
  app: ComponentOptions
}
export type RouterGuardPayload = {
  to: Route,
  from: Route,
  next: NavigationGuardNext,
  router: Router,
  app: ComponentOptions
}

export type HandleResult = { abort: boolean } & RawLocation | false | undefined

export abstract class Middleware {
  abstract handle (data: Payload): Promise<HandleResult>;
}

export async function handleMiddlewares
({
   to,
   from,
   next,
   app,
   router
 }: RouterGuardPayload) {
  const middlewareList = to.matched.flatMap((options: RouteRecord) => options.meta?.middleware || [])
  let resultLocation = undefined

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
