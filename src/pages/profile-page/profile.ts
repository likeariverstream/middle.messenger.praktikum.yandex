import ProfileController from '../../controllers/profile-controller'
import { Block } from '../../utils/block'
import template from './template.hbs'
import styles from './styles.module.pcss'
import { withStore } from '../../hocs/withStore'
import AuthController from '../../controllers/auth-controller'
import { Button } from '../../components/button/button'
import { User } from '../../api/auth-api'
import { ProfileField } from '../../components/profile-field/profile-field'
import router from '../../utils/router'

interface ProfileProps extends User { }

const userFields: Array<keyof ProfileProps> = [
    'id',
    'first_name',
    'second_name',
    'display_name',
    'login',
    'password',
    'avatar',
    'email',
    'phone',
]

const fieldLabels = [
    'ID',
    'Имя',
    'Фамилия',
    'Отображаемое имя',
    'Логин',
    'Пароль',
    'Аватар',
    'Email',
    'Телефон',
]

class ProfilePageBase extends Block<ProfileProps> {
    init() {
        this.children.fields = userFields
            .map((name, index) => new ProfileField({ name, value: this.props[name], text: fieldLabels[index] }))
        this.children.logoutButton = new Button({
            text: 'Выйти',
            events: {
                click: () => {
                    AuthController.logout()
                },
            },
        })
        this.children.confirmButton = new Button({
            text: 'Подтвердить данные',
            events: {
                click: (e) => {
                    this.onClick(e)
                },
            },
        })
    }

    onClick(event: Event) {
        event.preventDefault()
        const fields = Array.from(document.querySelectorAll('input'))
        const data: Record<string, string> = {}
        fields.forEach((field) => {
            data[field.name] = field.value
        })

        ProfileController.updateProfile(data).then(() => router.go('/messenger'))
    }

    protected componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
        (this.children.fields as ProfileField[]).forEach((field, i) => {
            field.setProps({ value: newProps[userFields[i]] })
        })
        return false
    }

    render() {
        return this.compile(template, { ...this.props, styles })
    }
}

const withUser = withStore((state) => ({ ...state.user }))

export const ProfilePage = withUser(ProfilePageBase)
