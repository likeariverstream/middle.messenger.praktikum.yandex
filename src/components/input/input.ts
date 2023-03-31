import { Block } from '../../utils/block'
import styles from './styles.module.pcss'
import template from './template.hbs'

interface InputProps {
    type: string
    name: string
    placeholder: string
    pattern?: RegExp
    events?: {
        focus: () => void
        change: () => void
        blur: (e: Event) => void
    }
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props)
    }

    public setValue(value: string) {
        (this.element as HTMLInputElement).value = value
        return (this.element as HTMLInputElement).value
    }

    public getName() {
        return (this.element as HTMLInputElement).name
    }

    public getValue() {
        return (this.element as HTMLInputElement).value
    }

    render() {
        return this.compile(template, { ...this.props, styles })
    }
}
