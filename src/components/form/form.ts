import { Block, Children } from "../../utils/block"
import { Input } from "../input/input"
import Handlebars, { template } from "handlebars"
import { Button } from "../button/button"

export interface Form {
    tagName: string
    __id: string
    id: string
    events: {
        submit: () => void
    }
}
type Props = {
    id: string
    children: Children | Record<string, Block>
    class: string
    submit: (e: SubmitEvent) => void
}
export class Form extends Block {
    constructor(tagName: string | undefined, props: Props) {
        super(tagName, {
            ...props, events: {
                submit: props.submit
            }
        })
    }
    
    render() {
        this._addEvents()
        this.element?.setAttribute('id', this.props.id)
        const tagName = this.tagName
        const source = ''
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}   