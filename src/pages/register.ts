import { Link } from '../components/link/link'
import { Button } from '../components/button/button'
import { Form } from '../components/form/form'
import { renderDOM } from '../utils/render'
import { Input } from '../components/input/input'
import { redirect } from '../utils/redirect'
import { login } from './login'
import { error500 } from './error500'
import { chat } from './chat'
import { Item } from '../components/item/item'
import { Patterns } from '../types/patterns'
import { Errors } from '../types/errors'
import { validateInput } from '../utils/validate'
import { getFormData } from '../utils/get-form-data'

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
        type: 'submit',
    })

    const firstNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Имя',
        class: 'input',
        name: 'first_name',
        focus: (e) => validateInput(e, errorFirstName),
        blur: (e) => validateInput(e, errorFirstName),
        pattern: Patterns.name,
    })
    const errorFirstName = new Item('span', {
        text: Errors.name,
        class: 'error-input',
    })
    const secondNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Фамилия',
        class: 'input',
        name: 'second_name',
        focus: (e) => validateInput(e, errorSecondName),
        blur: (e) => validateInput(e, errorSecondName),
        pattern: Patterns.name,
    })
    const errorSecondName = new Item('span', {
        text: Errors.name,
        class: 'error-input',
    })
    const displayNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Отображаемое имя',
        class: 'input',
        name: 'display_name',
        focus: (e) => validateInput(e, errorDisplayName),
        blur: (e) => validateInput(e, errorDisplayName),
        pattern: Patterns.name,
    })
    const errorDisplayName = new Item('span', {
        text: Errors.name,
        class: 'error-input',
    })
    const loginInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Придумайте логин',
        class: 'input',
        name: 'login',
        focus: (e) => validateInput(e, errorLogin),
        blur: (e) => validateInput(e, errorLogin),
        pattern: Patterns.login,
    })
    const errorLogin = new Item('span', {
        text: Errors.login,
        class: 'error-input',
    })
    const emailInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Введите email',
        class: 'input',
        name: 'email',
        focus: (e) => validateInput(e, errorEmail),
        blur: (e) => validateInput(e, errorEmail),
        pattern: Patterns.email,
    })
    const errorEmail = new Item('span', {
        text: Errors.email,
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
        pattern: Patterns.password,
    })
    const errorPassword = new Item('span', {
        text: Errors.password,
        class: 'error-input',
    })
    const phoneInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Введите телефон',
        class: 'input',
        name: 'phone',
        focus: (e) => validateInput(e, errorPhone),
        blur: (e) => validateInput(e, errorPhone),
        pattern: Patterns.phone,
    })
    const errorPhone = new Item('span', {
        text: Errors.phone,
        class: 'error-input',
    })
    const form = new Form('form', {
        id: 'register-form',
        class: 'form',
        children: {},
        submit: (e) => getFormData(e, '#register-form'),
    })

    renderDOM('#register', form)
    renderDOM('#register-form', firstNameInput)
    renderDOM('#register-form', errorFirstName)
    renderDOM('#register-form', secondNameInput)
    renderDOM('#register-form', errorSecondName)
    renderDOM('#register-form', displayNameInput)
    renderDOM('#register-form', errorDisplayName)
    renderDOM('#register-form', loginInput)
    renderDOM('#register-form', errorLogin)
    renderDOM('#register-form', emailInput)
    renderDOM('#register-form', errorEmail)
    renderDOM('#register-form', passwordInput)
    renderDOM('#register-form', errorPassword)
    renderDOM('#register-form', phoneInput)
    renderDOM('#register-form', button)
    renderDOM('#register-form', loginPageLink)
    renderDOM('#register-form', chatPageLink)
    renderDOM('#register-form', page500Link)
}
