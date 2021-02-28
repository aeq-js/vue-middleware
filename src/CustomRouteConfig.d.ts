import { Component, Dictionary, NavigationGuard, PathToRegexpOptions, RedirectOption, RoutePropsFunction } from 'vue-router/types/router';
import { Middleware } from './Middleware';
export declare type CustomRouteConfig = {
    path: string;
    name?: string;
    component?: Component;
    components?: Dictionary<Component>;
    redirect?: RedirectOption;
    alias?: string | string[];
    children?: CustomRouteConfig[];
    beforeEnter?: NavigationGuard;
    props?: boolean | Object | RoutePropsFunction;
    caseSensitive?: boolean;
    pathToRegexpOptions?: PathToRegexpOptions;
    meta?: {
        middleware?: Middleware[];
    };
};
