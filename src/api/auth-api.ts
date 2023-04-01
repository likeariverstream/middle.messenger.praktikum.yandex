import BaseAPI from './base-api'

export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
  error?: string
  isLoading?: boolean
  data?: unknown
}

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth')
    }

    signin(data: SigninData) {
        return this.http.post('/signin', data)
    }

    signup(data: SignupData) {
        return this.http.post('/signup', data)
    }

    read(): Promise<User> {
        return this.http.get('/user')
    }

    logout() {
        return this.http.post('/logout')
    }

    create = undefined

    update = undefined

    delete = undefined
}

export default new AuthAPI()
