import template from './button.hbs'
import { Block } from '../../utils/block'
import styles from './styles.module.pcss'

interface ButtonProps {
    type?: string
    text: string
    events: {
        click?: (e: Event) => void
        submit?: (e: SubmitEvent) => void
    }
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({ type: 'button', ...props })
    }

    render() {
        return this.compile(template, { ...this.props, styles })
    }
}
