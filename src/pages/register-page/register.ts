import { Block } from '../../utils/block'
import template from './template.hbs'
import { Button } from '../../components/button/button'
import { Input } from '../../components/input/input'
import styles from './styles.module.pcss'
import { Link } from '../../components/link/link'
import { SignupData } from '../../api/auth-api'
import AuthController from '../../controllers/auth-controller'
import { Routes } from '../../types/routes'

export class RegisterPage extends Block {
    constructor() {
        super({})
    }

    init() {
        this.children.firstName = new Input({
            name: 'first_name',
            type: 'text',
            placeholder: 'Имя',
        })

        this.children.secondName = new Input({
            name: 'second_name',
            type: 'text',
            placeholder: 'Фамилия',
        })

        this.children.email = new Input({
            name: 'email',
            type: 'email',
            placeholder: 'E-mail',
        })

        this.children.login = new Input({
            name: 'login',
            type: 'text',
            placeholder: 'Логин',
        })

        this.children.phone = new Input({
            name: 'phone',
            type: 'tel',
            placeholder: 'Телефон',
        })

        this.children.password = new Input({
            name: 'password',
            type: 'password',
            placeholder: 'Пароль',
        })

        this.children.button = new Button({
            text: 'Зарегистрироваться',
            events: {
                click: () => this.onSubmit(),
            },
        })

        this.children.link = new Link({
            text: 'Назад',
            to: Routes.login,
        })
    }

    onSubmit() {
        const values = Object
            .values(this.children)
            .filter((child) => child instanceof Input)
            .map((child) => ([(child as Input).getName(), (child as Input).getValue()]))
        const data = Object.fromEntries(values)
        AuthController.signup(data as SignupData)
    }

    render() {
        return this.compile(template, { ...this.props, styles })
    }
}
