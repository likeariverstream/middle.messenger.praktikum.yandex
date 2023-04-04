import { Block } from '../../utils/block'
import template from './message.hbs'
import styles from './styles.module.pcss'

interface MessageProps {
    content: string;
    isMine: boolean;
}

export class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super(props)
    }

    render() {
        return this.compile(template, { ...this.props, styles })
    }
}
