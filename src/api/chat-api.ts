import { BaseAPI } from './base-api'
import { User } from './auth-api'

export interface ChatInfo {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: User,
        time: string;
        content: string;
    }
}

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats')
    }

    create(title: string) {
        return this.http.post('/', { title })
    }

    delete(id: number): Promise<unknown> {
        return this.http.delete('/', { chatId: id })
    }

    read(): Promise<ChatInfo[]> {
        return this.http.get('/')
    }

    getUsers(id: number): Promise<Array<User & { role: string }>> {
        return this.http.get(`/${id}/users`)
    }

    addUsers(users: number[], id: number): Promise<unknown> {
        return this.http.put('/users', { users, chatId: id })
    }

    deleteUsers(users: number[], id: number): Promise<unknown> {
        return this.http.delete('/users', { users, chatId: id })
    }

    async getToken(id: number): Promise<string | undefined> {
        try {
            const response = await this.http.post<{ token: string }>(`/token/${id}`)
            return response.token
        } catch (e) {
            console.warn(e)
        }
        return undefined
    }
}

export const API = new ChatsAPI()
