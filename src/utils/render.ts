import { Block } from './block'

export const render = (query: string, block: Block) => {
    const root = document.querySelector(query)

    if (root === null) {
        throw new Error(`root not found by selector "${query}"`)
    }

    root.innerHTML = ''

    root.append(block.getContent()!)

    return root
}
