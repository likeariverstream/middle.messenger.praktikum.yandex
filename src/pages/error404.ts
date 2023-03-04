import { renderDOM } from '../utils/render'
import { Error } from '../components/error/error'
import { Link } from '../components/link/link'
import { redirect } from '../utils/redirect'
import { login } from './login'

export const error404 = () => {
    const error = new Error('h4', {
        class: 'error',
        text: 'Страница не найдена',
    })
    const loginPageLink = new Link('a', {
        class: 'link',
        click: (e) => redirect(e, '#error404', 'root', login, 'main'),
        href: './',
        text: 'Вернуться назад?',
    })

    renderDOM('#error404', error)
    renderDOM('#error404', loginPageLink)
}
