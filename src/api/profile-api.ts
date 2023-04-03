import { BaseAPI } from './base-api'
import { User } from './auth-api'

export interface ChangePassword {
    oldPassword: string
    newPassword: string
}
export type PublicUserFields = Omit<User, 'password' | 'avatar'>
export interface SearchUser {
    login: string
}

export class ProfileAPI extends BaseAPI {
    constructor() {
        super('/user')
    }

    read(identifier: string): Promise<PublicUserFields> {
        return this.http.get(`/${identifier}`)
    }

    update(data: PublicUserFields): Promise<User> {
        return this.http.put('/profile', data)
    }

    changeAvatar(data: FormData): Promise<PublicUserFields> {
        return this.http.put('/profile/avatar', data)
    }

    changePassword(data: ChangePassword): Promise<PublicUserFields> {
        return this.http.put('/password', data)
    }

    searchUser(data: SearchUser): Promise<User> {
        return this.http.post('/search', data)
    }

    create = undefined

    delete = undefined
}
