import Handlebars from 'handlebars'
import { Block } from '../../utils/block'

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
    change?: (e: Event) => void
    blur: (e: Event) => void
    value: string
    pattern: string
}
export class Input extends Block {
    value: string

    constructor(tagName: string | undefined, props: Props) {
        super(tagName, {
            ...props,
            events: {
                focus: props.focus,
                change: props.change,
                blur: props.blur,
            },
        })
    }

    render() {
        this.element?.setAttribute('name', this.props.name)
        this.element?.setAttribute('type', this.props.type)
        this.element?.setAttribute('required', true.toString())
        this.element?.setAttribute('pattern', this.props.pattern)
        this.element?.setAttribute('placeholder', this.props.placeholder)
        const { tagName } = this
        const source = ''
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}
