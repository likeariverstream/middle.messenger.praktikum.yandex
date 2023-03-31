import { Block } from '../../utils/block'
import template from './template.hbs'
import styles from './styles.module.pcss'

interface AvatarProps {
    src: string
    alt: string
    events: {
        click: () => void
    }
}

export class Avatar extends Block<AvatarProps> {
    constructor(props: AvatarProps) {
        super({ ...props })
    }

    render() {
        return this.compile(template, { ...this.props, styles })
    }
}
