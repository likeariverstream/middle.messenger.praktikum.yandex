import { profileController } from '../../controllers/profile-controller'
import { Block } from '../../utils/block'
import template from './template.hbs'
import styles from './styles.module.pcss'
import { store, withStore } from '../../hocs/withStore'
import { authController } from '../../controllers/auth-controller'
import { Button } from '../../components/button/button'
import { User } from '../../api/auth-api'
import { ProfileField } from '../../components/profile-field/profile-field'
import { router } from '../../utils/router'
import { Avatar } from '../../components/avatar/avatar'
import { Input } from '../../components/input/input'
import { baseUrl, avatarResourseEndPoint } from '../../data/urls'

interface ProfileProps extends User {
    changeAvatarMode: boolean
}

const userFields: Array<keyof ProfileProps> = [
    'id',
    'first_name',
    'second_name',
    'display_name',
    'login',
    'email',
    'phone',
]

const fieldLabels = [
    'ID',
    'Имя',
    'Фамилия',
    'Отображаемое имя',
    'Логин',
    'Email',
    'Телефон',
]

class ProfilePageBase extends Block<ProfileProps> {
    init() {
        this.children.avatar = new Avatar({
            src: `${baseUrl}${avatarResourseEndPoint}${store.getState().user.avatar}`,
            alt: 'Аватар',
            events: {
                click: () => true,
            },
        })
        this.children.fields = userFields
            .map((name, index) => new ProfileField({ name, value: this.props[name], text: fieldLabels[index] }))
        this.children.logoutButton = new Button({
            text: 'Выйти',
            events: {
                click: () => {
                    authController.logout()
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
        this.children.changeAvatarButton = new Button({
            text: 'Загрузить аватар',
            type: 'submit',
            events: {
                click: (event) => {
                    this.changeAvatar(event)
                },
            },
        })
        this.children.changeAvatarInput = new Input({
            type: 'file',
            placeholder: 'Добавьте файл',
            name: 'avatar',
        })
        this.children.oldPasswordInput = new Input({
            type: 'password',
            placeholder: 'Старый пароль',
            name: 'old-password',
        })
        this.children.newPasswordInput = new Input({
            type: 'password',
            placeholder: 'Новый пароль',
            name: 'new-password',
        })
        this.children.changePasswordButton = new Button({
            text: 'Изменить пароль',
            type: 'submit',
            events: {
                click: (event) => this.changePassword(event),
            },
        })
    }

    changePassword(event: Event) {
        event.preventDefault()
        const oldPasswordValue = (this.children.oldPasswordInput as Input).getValue()
        const newPasswordValue = (this.children.newPasswordInput as Input).getValue()
        const data = { oldPassword: oldPasswordValue, newPassword: newPasswordValue }
        if (oldPasswordValue !== newPasswordValue) {
            profileController.updatePassword(data)
        }
    }

    changeAvatar(event: Event) {
        event.preventDefault()
        const inputAvatar = document.getElementsByName('avatar')[0] as HTMLInputElement
        const file = inputAvatar.files?.[0]
        if (file !== undefined) {
            const formData = new FormData()
            formData.append('avatar', file, file.name)
            profileController.updateAvatar(formData)
        }
    }

    onClick(event: Event) {
        event.preventDefault()
        const fields = Array.from(document.querySelectorAll('input'))
        const data: Record<string, string> = {}
        fields.forEach((field) => {
            data[field.name] = field.value
        })

        profileController.updateProfile(data).then(() => router.go('/messenger'))
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
