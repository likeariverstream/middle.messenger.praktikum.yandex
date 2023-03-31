import { Block } from './block'
import { isEqual } from './equal'
import { render } from './render'

export interface BlockConstructable<P extends Record<string, any> = any> {
    new(props: P): Block<P>;
}

export class Route {
    private block: Block | null = null

    constructor(
        private pathname: string,
        private readonly blockClass: BlockConstructable,
        private readonly query: string,
    ) {
    }

    leave() {
        this.block = null
    }

    match(pathname: string) {
        return isEqual(pathname, this.pathname)
    }

    render() {
        if (!this.block) {
            this.block = new this.blockClass({})

            render(this.query, this.block)
        }
    }
}
