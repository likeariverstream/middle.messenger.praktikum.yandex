import Handlebars from 'handlebars'
import { Block } from '../../utils/block'

export interface Avatar {
    tagName: string
    __id: string
    events: {
        click: () => void
    }
}
type Props = {
    class: string
    click: (e: Event) => void
}
export class Avatar extends Block {
    constructor(tagName: string | undefined, props: Props) {
        super(tagName, {
            ...props,
            events: {
                click: props.click,
            },
        })
    }

    render() {
        const { tagName } = this
        const source = ''
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}
