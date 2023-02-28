import { Block } from "../../utils/block"
import Handlebars from "handlebars"

export interface Error {
    tagName: string
    __id: string
    events?: {
        click: () => void
    }
}
type Props = {
    text: string
    class: string
    type: string
    click?: (e: Event) => void
}
export class Error extends Block {
    constructor(tagName: string | undefined, props: Props) {
        super(tagName, {
            ...props, events: {
                click: props.click
            }
        })
    }
    render() {
        this._addEvents()
        const tagName = this.tagName
        const source = this.props.text
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}   