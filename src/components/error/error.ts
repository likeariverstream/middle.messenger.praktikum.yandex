import { Block } from "../../utils/block"
import Handlebars from "handlebars"

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
        super(tagName, {
            ...props})
    }
    render() {
        this._addEvents()
        const tagName = this.tagName
        const source = this.props.text
        const template = Handlebars.compile(source)
        return template({ tagName })
    }
}   