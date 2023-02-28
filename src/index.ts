import { Button } from "./components/button/button"
import { Avatar } from "./components/avatar/avatar"
import { render } from "./utils/render"
import { Input } from "./components/input/input"

document.addEventListener("DOMContentLoaded", () => {
    const button = new Button('button', {
        text: 'Войти', class: 'button', type: 'button', click: () => console.log('hi')
    })
    const avatar = new Avatar('div', {
        class: 'avatar', click: () => console.log('hi')
    })
    const input = new Input('input', {
        type: 'email',
        value: '',
        placeholder: 'Введите что-нибудь' ,
        class: 'input',
        name: 'login',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    render("#root", button)
    render("#root", avatar)
    render("#root", input)
})