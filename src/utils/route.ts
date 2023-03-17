import { Block } from './block'
import { renderDOM } from './render'
import { isEqual } from './equal'

export class Route {
    _pathname: string

    _props: any

    _blockClass: typeof Block

    _block: Block | null

    constructor(pathname: string, view: typeof Block, props: any) {
        this._pathname = pathname
        this._blockClass = view
        this._block = null
        this._props = props
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname
            this.render()
        }
    }

    leave() {
        if (this._block) {
            this._block.hide()
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname)
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props)
            renderDOM(this._props.rootQuery, this._block)
            return
        }

        this._block.show()
    }
}
