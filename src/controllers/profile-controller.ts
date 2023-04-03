import { ProfileAPI, ChangePassword, SearchUser } from '../api/profile-api'
import { store } from '../hocs/withStore'
import { authController } from '../controllers/auth-controller'

class ProfileController {
    private readonly api

    constructor() {
        this.api = new ProfileAPI()
    }

    async updateProfile(data: Record<string, string>) {
        try {
            await this.api.update(data)
            await authController.fetchUser()
        } catch (e) {
            store.set('user.error', (e))
        }
    }

    async updateAvatar(data: FormData) {
        try {
            await this.api.changeAvatar(data)
            await authController.fetchUser()
        } catch (e) {
            store.set('user.error', (e))
        }
    }

    async updatePassword(data: ChangePassword) {
        try {
            const user = await this.api.changePassword(data)
            store.set('user.data', user)
        } catch (e) {
            store.set('user.error', e)
        }
    }

    async searchUser(data: SearchUser) {
        try {
            const user = await this.api.searchUser(data)
            store.set('userSearchResults', user)
        } catch (e) {
            store.set('user.error', e)
        }
    }
}

export const profileController = new ProfileController()
