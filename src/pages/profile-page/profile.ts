import { Block } from '../../utils/block'
import template from './template.hbs'
import { withStore } from '../../hocs/withStore'
import AuthController from '../../controllers/auth-controller'
import { Button } from '../../components/button/button'
import { User } from '../../api/auth-api'
import { ProfileField } from '../../components/profile-field/profile-field'

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

class ProfilePageBase extends Block<ProfileProps> {
    init() {
        this.children.fields = userFields.map((name) => new ProfileField({ name, value: this.props[name] }))
        this.children.logoutButton = new Button({
            text: 'Выйти',
            events: {
                click: () => {
                    AuthController.logout()
                },
            },
        })
    }

    protected componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
        (this.children.fields as ProfileField[]).forEach((field, i) => {
            field.setProps({ value: newProps[userFields[i]] })
        })
        return false
    }

    render() {
        return this.compile(template, this.props)
    }
}

const withUser = withStore((state) => ({ ...state.user }))

export const ProfilePage = withUser(ProfilePageBase)
