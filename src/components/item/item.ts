import Handlebars from 'handlebars'
import { Block } from '../../utils/block'

export interface Item {
    tagName: string
    __id: string
    events: {
        click: () => void
    }
}
type Props = {
    id?: string
    text: string
    class: string
    click?: (e: Event) => void
}
export class Item extends Block {
    constructor(tagName: string | undefined, props: Props) {
        super(tagName, {
            ...props,
            events: {
                click: props.click,
            },
        })
    }

    render() {
        this._addEvents()
        const { tagName } = this
        this.element?.setAttribute('id', this.props.id)
        const source = this.props.text
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}
