import { Link } from "../components/link/link"
import { Avatar } from "../components/avatar/avatar"
import { Button } from "../components/button/button"
import { Form } from "../components/form/form"
import { renderDOM } from "../utils/render"
import { Input } from "../components/input/input"
import { redirect } from "../utils/redirect"
import { register } from "./register"
import { error404 } from "./error404"
import { chat } from "./chat"

export const login = () => {
    const profileLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#root', 'register', register, 'main'),
        href: '/profile',
        text: 'Нет аккаунта?'
    })
    const page404Link = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#root', 'error404', error404, 'main'),
        href: './404',
        text: 'Задать вопрос'
    })
    const chatLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#root', 'chat', chat, 'chat'),
        href: './chat',
        text: 'Войти с помощью Mail.ru'
    })
    const button = new Button('button', {
        text: 'Войти',
        class: 'button',
        type: 'button',
        click: () => console.log('hi')
    })

    const emailInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Введите логин',
        class: 'input',
        name: 'login',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const passwordInput = new Input('input', {
        type: 'password',
        value: '',
        placeholder: 'Введите пароль',
        class: 'input',
        name: 'password',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const form = new Form('form', {
        id: 'login-form',
        class: 'form',
        children: {},
        submit: (e) => console.log(e)
    })
    renderDOM("#root", form)
    renderDOM("#login-form", emailInput)
    renderDOM("#login-form", passwordInput)
    renderDOM("#login-form", button)
    renderDOM("#login-form", profileLink)
    renderDOM("#login-form", page404Link)
    renderDOM("#login-form", chatLink)
}