import { Block } from "../../utils/block"
import Handlebars from "handlebars"

export interface Input {
    tagName: string
    __id: string
    events: {
        focus: () => void
        change: () => void
    }
}
type Props = {
    type: string
    placeholder: string
    text?: string
    class: string
    name: string
    focus: (e: Event) => void
    change: (e: Event) => void
    value: string
}
export class Input extends Block {
    constructor(tagName: string | undefined, props: Props) {
        super(tagName, {
            ...props, events: {
                focus: props.focus,
                change: props.change
            }
        })
    }
    render() {
        this.element?.setAttribute('name', this.props.name)
        this.element?.setAttribute('type', this.props.type)
        this.element?.setAttribute('placeholder', this.props.placeholder)
        this._addEvents()
        const tagName = this.tagName
        const source = ''
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}   