import { Block } from '../../utils/block'
import styles from './styles.module.pcss'
import template from './template.hbs'

interface ErrorProps {
    text: string
}

export class Error extends Block<ErrorProps> {
    constructor(props: ErrorProps) {
        super(props)
    }

    render() {
        return this.compile(template, { ...this.props, styles })
    }
}
