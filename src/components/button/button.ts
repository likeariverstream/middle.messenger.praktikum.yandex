import { Block } from "../../utils/block"
import Handlebars from "handlebars"

export interface Button {
    tagName: string
    text: string
    events: () => void
    __id: string
    class: string
    type: string
}
export class Button extends Block {
    constructor(tagName: string | undefined, props: {} | undefined) {
        super(tagName, props)
    }
    render() {
        const tagName = this.tagName
        this.element?.setAttribute('type', this.props.type)
        const source =  this.props.text
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}   