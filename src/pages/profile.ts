import { Item } from '../components/item/item'
import { Link } from '../components/link/link'
import { Avatar } from '../components/avatar/avatar'
import { Button } from '../components/button/button'
import { Form } from '../components/form/form'
import { renderDOM } from '../utils/render'
import { Input } from '../components/input/input'
import { redirect } from '../utils/redirect'
import { chat } from './chat'
import { PATTERNS } from '../types/patterns'
import { ERRORS } from '../types/errors'
import { validateInput, validateForm } from '../utils/validate'
import { getFormData } from '../utils/get-form-data'

export const profile = () => {
    const avatar = new Avatar('div', {
        class: 'avatar',
        click: (e) => console.log(e.target),
    })

    const chatLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#profile', 'chat', chat, 'chat'),
        href: './chat',
        text: 'Вернуться назад?',
    })
    const button = new Button('button', {
        text: 'Сохранить изменения',
        class: 'button',
        type: 'submit',
    })
    const firstNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Имя',
        class: 'input_profile',
        name: 'first_name',
        focus: (e) => validateInput(e, errorFirstName),
        blur: (e) => validateInput(e, errorFirstName),
        pattern: PATTERNS.name,
    })
    const errorFirstName = new Item('span', {
        text: ERRORS.name,
        class: 'error-input',
    })
    const secondNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Фамилия',
        class: 'input_profile',
        name: 'second_name',
        focus: (e) => validateInput(e, errorSecondName),
        blur: (e) => validateInput(e, errorSecondName),
        pattern: PATTERNS.name,
    })
    const errorSecondName = new Item('span', {
        text: ERRORS.name,
        class: 'error-input',
    })
    const displayNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Отображаемое имя',
        class: 'input_profile',
        name: 'display_name',
        focus: (e) => validateInput(e, errorDisplayName),
        blur: (e) => validateInput(e, errorDisplayName),
        pattern: PATTERNS.name,
    })
    const errorDisplayName = new Item('span', {
        text: ERRORS.name,
        class: 'error-input',
    })
    const loginInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Логин',
        class: 'input_profile',
        name: 'login',
        focus: (e) => validateInput(e, errorLogin),
        blur: (e) => validateInput(e, errorLogin),
        pattern: PATTERNS.login,
    })
    const errorLogin = new Item('span', {
        text: ERRORS.login,
        class: 'error-input',
    })
    const emailInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Email',
        class: 'input_profile',
        name: 'email',
        focus: (e) => validateInput(e, errorEmail),
        blur: (e) => validateInput(e, errorEmail),
        pattern: PATTERNS.email,
    })
    const errorEmail = new Item('span', {
        text: ERRORS.email,
        class: 'error-input',
    })
    const phoneInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Телефон',
        class: 'input_profile',
        name: 'phone',
        focus: (e) => validateInput(e, errorPhone),
        blur: (e) => validateInput(e, errorPhone),
        pattern: PATTERNS.phone,
    })
    const errorPhone = new Item('span', {
        text: ERRORS.phone,
        class: 'error-input',
    })
    const oldPasswordInput = new Input('input', {
        type: 'password',
        value: '',
        placeholder: 'Старый пароль',
        class: 'input_profile',
        name: 'oldPassword',
        focus: (e) => validateInput(e, errorOldPassword),
        blur: (e) => validateInput(e, errorOldPassword),
        pattern: PATTERNS.password,
    })
    const errorOldPassword = new Item('span', {
        text: ERRORS.password,
        class: 'error-input',
    })
    const newPasswordInput = new Input('input', {
        type: 'password',
        value: '',
        placeholder: 'Новый пароль',
        class: 'input_profile',
        name: 'newPassword',
        focus: (e) => validateInput(e, errorNewPassword),
        blur: (e) => validateInput(e, errorNewPassword),
        pattern: PATTERNS.password,
    })
    const errorNewPassword = new Item('span', {
        text: ERRORS.password,
        class: 'error-input',
    })
    const form = new Form('form', {
        id: 'profile-form',
        class: 'form',
        children: {},
        submit: (e) => {
            validateForm(e, errorForm, oldPasswordInput, newPasswordInput)
            getFormData(e, '#profile-form')
        },
    })
    const errorForm = new Item('span', {
        text: ERRORS.form,
        class: 'error-input',
    })
    renderDOM('#profile', form)
    renderDOM('#profile-form', avatar)
    renderDOM('#profile-form', firstNameInput)
    renderDOM('#profile-form', errorFirstName)
    renderDOM('#profile-form', secondNameInput)
    renderDOM('#profile-form', errorSecondName)
    renderDOM('#profile-form', displayNameInput)
    renderDOM('#profile-form', errorDisplayName)
    renderDOM('#profile-form', loginInput)
    renderDOM('#profile-form', errorLogin)
    renderDOM('#profile-form', emailInput)
    renderDOM('#profile-form', errorEmail)
    renderDOM('#profile-form', phoneInput)
    renderDOM('#profile-form', errorPhone)
    renderDOM('#profile-form', oldPasswordInput)
    renderDOM('#profile-form', errorOldPassword)
    renderDOM('#profile-form', newPasswordInput)
    renderDOM('#profile-form', errorNewPassword)
    renderDOM('#profile-form', button)
    renderDOM('#profile-form', errorForm)
    renderDOM('#profile-form', chatLink)
}
