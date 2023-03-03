import Handlebars from 'handlebars'
import { Block } from '../../utils/block'

export interface Error {
    tagName: string
    __id: string
}
type Props = {
    text: string
    class: string
}
export class Error extends Block {
    constructor(tagName: string | undefined, props: Props) {
        super(tagName, { ...props })
    }

    render() {
        const { tagName } = this
        const source = this.props.text
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}
