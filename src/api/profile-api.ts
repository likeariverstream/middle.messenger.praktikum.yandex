import BaseAPI from './base-api'
import { User } from './auth-api'

export interface ChangePassword {
    oldPassword: string
    newPassword: string
}

export interface SearchUser {
    login: string
}

export class ProfileAPI extends BaseAPI {
    constructor() {
        super('/user')
    }

    read(identifier: string): Promise<any> {
        return this.http.get(`/${identifier}`)
    }

    update(data: any): Promise<any> {
        return this.http.put('/profile', data)
    }

    loadAvatar(data: FormData): Promise<any> {
        return this.http.put('/profile/avatar', data)
    }

    changePassword(data: ChangePassword): Promise<User> {
        return this.http.put('/password', data)
    }

    searchUser(data: SearchUser): Promise<User> {
        return this.http.post('/search', data)
    }

    create = undefined

    delete = undefined
}

export default new ProfileAPI()
