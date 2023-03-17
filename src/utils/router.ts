import { Block } from './block'
import { Route } from './route'

export class Router {
    routes: Route[] = []

    history: History = window.history

    _currentRoute: Route | null = null

    _rootQuery: string

    static __instance: Router

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance
        }
        this.routes = []
        this.history = window.history
        // this._currentRoute = null;
        this._rootQuery = rootQuery
        Router.__instance = this
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery })
        this.routes.push(route)
        return this
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            if (event.currentTarget !== null) {
                this._onRoute((event.currentTarget as Window).location.pathname)
            }
        })
        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname)
        if (!route) {
            return
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave()
        }
        this._currentRoute = route

        route.render()
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname)
        this._onRoute(pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname))
    }
}
