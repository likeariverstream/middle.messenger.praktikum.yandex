import { renderDOM } from "../utils/render"
import { Error } from "../components/error/error"
import { Link } from "../components/link/link"
import { redirect } from "../utils/redirect"
import { login } from "./login"

export const error500 = () => {
    const error = new Error('h4', {
        class: 'error',
        text: 'Неожиданная ошибка'
    })
    const loginPageLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#error500', 'root', login, 'main'),
        href: './',
        text: 'Вернуться назад?'
    })

    renderDOM("#error500", error)
    renderDOM("#error500", loginPageLink)
}