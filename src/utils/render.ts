import { Block } from './block'

type RenderDOM = (query: string, block: Block | null) => Element | undefined;

export const renderDOM: RenderDOM = (query, block) => {
    const root = document.querySelector(query)
    if ((root && block !== null)) {
        root.appendChild(block.getContent())
        block.dispatchComponentDidMount()
        return root
    }
    return undefined
}
