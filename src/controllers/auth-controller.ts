import API, { AuthAPI, SigninData, SignupData } from '../api/auth-api'
import store from '../hocs/withStore'
import router from '../utils/router'
import MessagesController from './message-controller'

class AuthController {
    private readonly api: AuthAPI

    constructor() {
        this.api = API
    }

    async signin(data: SigninData) {
        console.log('hi')
        try {
            await this.api.signin(data)
            await this.fetchUser()
            router.go('/profile')
        } catch (e: any) {
            console.error(e)
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data)
            await this.fetchUser()
            router.go('/profile')
        } catch (e: any) {
            console.error(e.message)
        }
    }

    public async fetchUser() {
        const user = await this.api.read()
        store.set('user', user)
    }

    async logout() {
        try {
            MessagesController.closeAll()
            await this.api.logout()
            router.go('/')
        } catch (e: any) {
            console.error(e.message)
        }
    }
}

export default new AuthController()
