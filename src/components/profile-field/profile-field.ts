import { Block } from '../../utils/block'
import template from './template.hbs'
import styles from './styles.module.pcss'

interface ProfileFieldProps {
    name: string
    value: string | number | unknown
    text: string
}

export class ProfileField extends Block<ProfileFieldProps> {
    constructor(props: ProfileFieldProps) {
        super(props)
    }

    public getName() {
        return this.props.name
    }

    public getValue() {
        return this.props.value
    }

    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props, styles })
    }
}
