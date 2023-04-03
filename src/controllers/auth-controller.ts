import {
    API, AuthAPI, SigninData, SignupData,
} from '../api/auth-api'
import { store } from '../hocs/withStore'
import { router } from '../utils/router'
import { messagesController } from './message-controller'

class AuthController {
    private readonly api: AuthAPI

    constructor() {
        this.api = API
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data)
            await this.fetchUser()
            router.go('/messenger')
        } catch (e) {
            console.error(e)
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data)
            await this.fetchUser()
            router.go('/messenger')
        } catch (e) {
            console.error(e.message)
        }
    }

    public async fetchUser() {
        const user = await this.api.read()
        store.set('user', user)
    }

    async logout() {
        try {
            messagesController.closeAll()
            await this.api.logout()
            router.go('/')
        } catch (e) {
            console.error(e.message)
        }
    }
}

export const authController = new AuthController()
