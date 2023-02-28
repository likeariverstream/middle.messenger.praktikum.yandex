
export const render = (query, block) => {
    const root = document.querySelector(query)
    root.appendChild(block.getContent())
    block.dispatchComponentDidMount()

    return root
} 