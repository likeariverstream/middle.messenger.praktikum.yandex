import { Block } from "../../utils/block"
import Handlebars from "handlebars"

export interface Link {
    tagName: string
    __id: string
    events: {
        click: () => void
    }
}
type Props = {
    text: string
    class: string
    href: string
    click: (e: Event) => void
}
export class Link extends Block {
    constructor(tagName: string | undefined, props: Props) {
        super(tagName, {
            ...props, events: {
                click: props.click
            }
        })
    }
    render() {
        this.element?.setAttribute('href', this.props.href)
        this._addEvents()
        const tagName = this.tagName
        const source = this.props.text
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}