import { withRouter, PropsWithRouter } from '../../hocs/whithRouter'
import { Block } from '../../utils/block'
import styles from './styles.module.pcss'
import template from './template.hbs'

interface LinkProps extends PropsWithRouter {
    to: string
    text: string
    events: {
        click: () => void
    }
}

export class BaseLink extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: () => this.navigate(),
            },
        })
    }

    navigate() {
        this.props.router.go(this.props.to)
    }

    render() {
        return this.compile(template, { ...this.props, styles })
    }
}

export const Link = withRouter(BaseLink)
