import { Block, Children } from "../../utils/block"
import Handlebars from "handlebars"
import { Input } from "components/input/input"

export interface Button {
    tagName: string
    // text: string
    __id: string
    // class: string
    // type: string
    events: {
        click: () => void
    }
}
type Props = {
    text: string
    class: string
    type: string
    click: (e: Event) => void
}
export class Button extends Block {
    constructor(tagName: string | undefined, props: Props) {
        super(tagName, {
            ...props, events: {
                click: props.click
            }
        })
    }

    render() {
        this.element?.setAttribute('type', this.props.type)
        this._addEvents()
        const tagName = this.tagName
        const source = this.props.text
        const template = Handlebars.compile(source)
        return template({tagName})
    }
}