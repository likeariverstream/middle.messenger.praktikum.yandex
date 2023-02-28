import { Button } from "./components/button/button"
import { Avatar } from "./components/avatar/avatar"
import { render } from "./utils/render"

document.addEventListener("DOMContentLoaded", () => {
    const button = new Button('button', {
        text: 'Войти', class: 'button', type: 'button', click: () => console.log('hi')
    })
    const avatar = new Avatar('div', {
        class: 'avatar', click: () => console.log('hi')
    })
    render("#root", button)
    render("#root", avatar)
})