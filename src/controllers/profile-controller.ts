import { ProfileAPI } from '../api/profile-api'
import store from '../hocs/withStore'

import AuthController from '../controllers/auth-controller'

class ProfileController {
    private readonly api: any

    constructor() {
        this.api = new ProfileAPI()
    }

    async updateProfile(data: any) {
        try {
            await this.api.update(data)
            await AuthController.fetchUser()
        } catch (e: any) {
            store.set('user.error', (e as Error))
        }
    }

    async updateAvatar(data: FormData) {
        try {
            await this.api.loadAvatar(data)
            await AuthController.fetchUser()
        } catch (e: any) {
            store.set('user.error', (e as Error))
        }
    }

    async updatePassword(data: any) {
        try {
            const user = await this.api.changePassword(data)

            store.set('user.data', user)
        } catch (e: any) {
            store.set('user.error', e as Error)
        }
    }

    async findProfile(data: any) {
        store.set('userSearch', undefined)

        try {
            const user = await this.api.searchUser(data)

            store.set('userSearchResults', user)
        } catch (e: any) {
            store.set('user.error', e as Error)
        }
    }
}

export default new ProfileController()
