import { Link } from '../../components/link/link'
import { Block } from '../../utils/block'
import template from './login.hbs'
import styles from './styles.module.pcss'
import { Input } from '../../components/input/input'
import { Button } from '../../components/button/button'
import { Routes } from '../../types/routes'
import { authController } from '../../controllers/auth-controller'

export class LoginPage extends Block {
    constructor() {
        super({})
    }

    init() {
        this.children.login = new Input({
            type: 'text',
            name: 'login',
            placeholder: 'Введите логин',
        })
        this.children.password = new Input({
            type: 'password',
            name: 'password',
            placeholder: 'Введите пароль',
        })
        this.children.button = new Button({
            type: 'submit',
            text: 'Войти',
            events: {
                click: (e) => this.onClick(e),
            },
        })
        this.children.link = new Link({
            to: Routes.register,
            text: 'Регистрация',
        })
    }

    onClick(event: Event) {
        event.preventDefault()
        const values = Object
            .values(this.children)
            .filter((child) => child instanceof Input)
            .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
        const data = Object.fromEntries(values)
        authController.signin(data)
    }

    render() {
        return this.compile(template, { ...this.props, styles })
    }
}
