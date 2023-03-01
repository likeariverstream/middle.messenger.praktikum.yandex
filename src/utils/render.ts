
type RenderDOM = (query: string, block: {
    getContent: () => Node,
    dispatchComponentDidMount: () => void
}) => Node | null;

export const renderDOM: RenderDOM = (query, block) => {
    const root = document.querySelector(query)
    if (root) {
        root.appendChild(block.getContent())
        block.dispatchComponentDidMount()
        return root
    }
    return null
}
