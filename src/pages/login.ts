import { Link } from '../components/link/link'
import { Button } from '../components/button/button'
import { Form } from '../components/form/form'
import { renderDOM } from '../utils/render'
import { Input } from '../components/input/input'
import { redirect } from '../utils/redirect'
import { register } from './register'
import { error404 } from './error404'
import { chat } from './chat'
import { ERRORS } from '../types/errors'
import { PATTERNS } from '../types/patterns'
import { Item } from '../components/item/item'
import { validateInput } from '../utils/validate'
import { getFormData } from '../utils/get-form-data'

export const login = () => {
    const registerLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#root', 'register', register, 'main'),
        href: '/register',
        text: 'Нет аккаунта?',
    })
    const page404Link = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#root', 'error404', error404, 'main'),
        href: './404',
        text: 'Задать вопрос',
    })
    const chatLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#root', 'chat', chat, 'chat'),
        href: './chat',
        text: 'Войти с помощью Mail.ru',
    })
    const button = new Button('button', {
        text: 'Войти',
        class: 'button',
        type: 'submit',
    })
    const loginInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Введите логин',
        class: 'input',
        name: 'login',
        focus: (e) => validateInput(e, errorLogin),
        blur: (e) => validateInput(e, errorLogin),
        pattern: PATTERNS.login,
    })
    const errorLogin = new Item('span', {
        text: ERRORS.login,
        class: 'error-input',
    })
    const passwordInput = new Input('input', {
        type: 'password',
        value: '',
        placeholder: 'Введите пароль',
        class: 'input',
        name: 'password',
        focus: (e) => validateInput(e, errorPassword),
        blur: (e) => validateInput(e, errorPassword),
        pattern: PATTERNS.password,
    })
    const errorPassword = new Item('span', {
        text: ERRORS.password,
        class: 'error-input',
    })
    const form = new Form('form', {
        id: 'login-form',
        class: 'form',
        submit: (e) => getFormData(e, '#login-form'),
        children: {},
    })

    renderDOM('#root', form)
    renderDOM('#login-form', loginInput)
    renderDOM('#login-form', errorLogin)
    renderDOM('#login-form', passwordInput)
    renderDOM('#login-form', errorPassword)
    renderDOM('#login-form', button)
    renderDOM('#login-form', registerLink)
    renderDOM('#login-form', page404Link)
    renderDOM('#login-form', chatLink)
}
