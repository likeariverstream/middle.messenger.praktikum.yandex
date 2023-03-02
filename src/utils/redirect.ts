type Redirect = (e: Event, id: string, newId: string, callback: Function, className: string) => void

// const setLocation = (currentLocation: string) => {
//     try {
//         history.pushState(null, '', currentLocation)
//         return
//     } catch (e) {
//         console.warn(e)
//     }
//     location.hash = `#${currentLocation}`
// }
export const redirect: Redirect = (e, id, newId, callback, className) => {
    e.preventDefault()
    const root = document.querySelector(id)
    if (root) {
        root.innerHTML = ''
        root.setAttribute('id', newId)
        root.setAttribute('class', '')
        root.classList.add(className)
        callback()
    }
}
