import { Link } from '../components/link/link'
import { Button } from '../components/button/button'
import { Form } from '../components/form/form'
import { renderDOM } from '../utils/render'
import { Input } from '../components/input/input'
import { redirect } from '../utils/redirect'
import { login } from './login'
import { error500 } from './error500'
import { chat } from './chat'

export const register = () => {
    const currentPage = '#register'
    const loginPageLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, currentPage, 'root', login, 'main'),
        href: './',
        text: 'Вернуться назад?',
    })
    const chatPageLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, currentPage, 'chat', chat, 'chat'),
        href: './chat',
        text: 'Попробовать бесплатно',
    })
    const page500Link = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, currentPage, 'error500', error500, 'main'),
        href: './500',
        text: 'Или посмотреть еще варианты',
    })
    const button = new Button('button', {
        text: 'Зарегистрироваться',
        class: 'button',
        type: 'button',
        click: () => console.log('hi'),
    })

    const firstNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Имя',
        class: 'input',
        name: 'first_name',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target),
    })
    const secondNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Фамилия',
        class: 'input',
        name: 'second_name',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target),
    })
    const displayNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Отображаемое имя',
        class: 'input',
        name: 'display_name',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target),
    })
    const loginInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Придумайте логин',
        class: 'input',
        name: 'login',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target),
    })
    const emailInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Введите email',
        class: 'input',
        name: 'email',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target),
    })
    const phoneInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Введите телефон',
        class: 'input',
        name: 'phone',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target),
    })
    const oldPasswordInput = new Input('input', {
        type: 'password',
        value: '',
        placeholder: 'Старый пароль',
        class: 'input',
        name: 'oldPassword',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target),
    })
    const newPasswordInput = new Input('input', {
        type: 'password',
        value: '',
        placeholder: 'Новый пароль',
        class: 'input',
        name: 'newPassword',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target),
    })
    const form = new Form('form', {
        id: 'register-form',
        class: 'form',
        children: {},
        submit: (e) => console.log(e),
    })
    renderDOM('#register', form)
    renderDOM('#register-form', firstNameInput)
    renderDOM('#register-form', secondNameInput)
    renderDOM('#register-form', displayNameInput)
    renderDOM('#register-form', loginInput)
    renderDOM('#register-form', emailInput)
    renderDOM('#register-form', phoneInput)
    renderDOM('#register-form', oldPasswordInput)
    renderDOM('#register-form', newPasswordInput)
    renderDOM('#register-form', button)
    renderDOM('#register-form', loginPageLink)
    renderDOM('#register-form', chatPageLink)
    renderDOM('#register-form', page500Link)
}
