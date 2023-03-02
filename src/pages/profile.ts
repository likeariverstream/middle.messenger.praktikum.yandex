import { Link } from "../components/link/link"
import { Avatar } from "../components/avatar/avatar"
import { Button } from "../components/button/button"
import { Form } from "../components/form/form"
import { renderDOM } from "../utils/render"
import { Input } from "../components/input/input"
import { redirect } from "../utils/redirect"
import { chat } from "./chat"

export const profile = () => {
    const avatar = new Avatar('div', {
        class: 'avatar',
        click: (e) => console.log(e.target)
    })
    const chatLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#profile', 'chat', chat, 'chat'),
        href: './chat',
        text: 'Вернуться назад?'
    })
    const button = new Button('button', {
        text: 'Сохранить изменения',
        class: 'button',
        type: 'button',
        click: () => console.log('hi')
    })

    const firstNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Имя',
        class: 'input_profile',
        name: 'first_name',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const secondNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Фамилия',
        class: 'input_profile',
        name: 'second_name',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const displayNameInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Отображаемое имя',
        class: 'input_profile',
        name: 'display_name',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const loginInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Логин',
        class: 'input_profile',
        name: 'login',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const emailInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Email',
        class: 'input_profile',
        name: 'email',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const phoneInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Телефон',
        class: 'input_profile',
        name: 'phone',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const oldPasswordInput = new Input('input', {
        type: 'password',
        value: '',
        placeholder: 'Старый пароль',
        class: 'input_profile',
        name: 'oldPassword',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const newPasswordInput = new Input('input', {
        type: 'password',
        value: '',
        placeholder: 'Новый пароль',
        class: 'input_profile',
        name: 'newPassword',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })
    const form = new Form('form', {
        id: 'profile-form',
        class: 'form',
        children: {},
        submit: (e) => console.log(e)
    })
    renderDOM("#profile", form)
    renderDOM("#profile-form", avatar)
    renderDOM("#profile-form", firstNameInput)
    renderDOM("#profile-form", secondNameInput)
    renderDOM("#profile-form", displayNameInput)
    renderDOM("#profile-form", loginInput)
    renderDOM("#profile-form", emailInput)
    renderDOM("#profile-form", phoneInput)
    renderDOM("#profile-form", oldPasswordInput)
    renderDOM("#profile-form", newPasswordInput)
    renderDOM("#profile-form", button)
    renderDOM("#profile-form", chatLink)
}

