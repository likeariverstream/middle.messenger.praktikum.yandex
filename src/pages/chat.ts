import { renderDOM } from "../utils/render"
import { Link } from "../components/link/link"
import { redirect } from "../utils/redirect"
import { login } from "./login"
import { Item } from "../components/item/item"
import { profile } from "./profile"
import { Button } from "../components/button/button"
import { Input } from "../components/input/input"
import { chatItem } from "../components/chat-item/chat-item"
import { Error } from "../components/error/error"
import { chats } from "../data/data"
export const chat = () => {
    const error = new Error('h4', {
        class: 'error',
        text: 'Чат в разработке'
    })
    const sidePanel = new Item('section', {
        id: 'side-panel',
        class: 'side-panel',
        text: ''
    })
    const content = new Item('section', {
        id: 'content',
        class: 'content',
        text: ''
    })
    const list = new Item('ul', {
        id: 'list',
        class: 'list',
        text: ''
    })

    const nav = new Item('nav', {
        id: 'chat-nav',
        class: 'chat-nav',
        text: ''
    })
    const loginPageLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#chat', 'root', login, 'main'),
        href: './',
        text: 'Вернуться назад?'
    })
    const profilePageLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#chat', 'profile', profile, 'main'),
        href: './',
        text: 'Профиль'
    })
    const messageContainer = new Item('div', {
        id: 'input-message-container',
        class: 'input-message-container',
        text: ''
    })
    const button = new Button('button', {
        text: 'Отправить',
        class: 'button',
        type: 'button',
        click: () => console.log('hi')
    })

    const messageInput = new Input('input', {
        type: 'text',
        value: '',
        placeholder: 'Введите сообщение',
        class: 'input-message',
        name: 'message',
        focus: (e) => console.log(e.target),
        change: (e) => console.log(e.target)
    })

    renderDOM("#chat", sidePanel)
    renderDOM("#chat", content)
    renderDOM("#content", nav)
    renderDOM("#side-panel", list)
    chatItem("#list", chats)
    renderDOM("#chat-nav", loginPageLink)
    renderDOM("#chat-nav", profilePageLink)
    renderDOM("#content", error)
    renderDOM("#content", messageContainer)
    renderDOM("#input-message-container", messageInput)
    renderDOM("#input-message-container", button)
}