import { NavigationGuardNext, RawLocation, Route } from 'vue-router/types/router';
import Vue, { ComponentOptions } from 'vue';
import VueRouter from 'vue-router';
export { CustomRouteConfig } from './CustomRouteConfig';
export declare type Payload<V extends Vue = Vue> = {
    to: Route;
    from: Route;
    next: NavigationGuardNext<V>;
    router: VueRouter;
    app: ComponentOptions<V>;
};
export declare type RouterGuardPayload<V extends Vue = Vue> = {
    to: Route;
    from: Route;
    next: NavigationGuardNext<V>;
    router: VueRouter;
    app: ComponentOptions<V>;
};
export declare type HandleResult = {
    abort: boolean;
} & RawLocation | false | undefined;
export declare abstract class Middleware<V extends Vue = Vue> {
    abstract handle(data: Payload): Promise<HandleResult>;
}
export declare function handleMiddlewares<V extends Vue = Vue>({ to, from, next, app, router }: RouterGuardPayload): Promise<void>;
