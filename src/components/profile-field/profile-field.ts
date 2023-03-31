import { Block } from '../../utils/block'
import template from './template.hbs'

interface ProfileFieldProps {
    name: string
    value: string | number | unknown
}

export class ProfileField extends Block<ProfileFieldProps> {
    constructor(props: ProfileFieldProps) {
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
