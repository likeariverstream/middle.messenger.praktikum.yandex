import API, { ChatsAPI } from '../api/chat-api'
import store from '../hocs/withStore'
import MessagesController from './message-controller'

class ChatsController {
    private readonly api: ChatsAPI

    constructor() {
        this.api = API
    }

    async create(title: string) {
        await this.api.create(title)
        this.fetchChats()
    }

    async fetchChats() {
        const chats = await this.api.read()
        chats.map(async (chat) => {
            const token = await this.getToken(chat.id)
            await MessagesController.connect(chat.id, token)
        })
        store.set('chats', chats)
    }

    async addUserToChat(userId: number[], chatId: number) {
        this.api.addUsers(userId, chatId)
    }

    async deleteUserFromChat(userId: number[], chatId: number) {
        this.api.deleteUsers(userId, chatId)
    }

    async delete(id: number) {
        await this.api.delete(id)

        this.fetchChats()
    }

    async getToken(id: number) {
        return this.api.getToken(id)
    }

    selectChat(id: number) {
        store.set('selectedChat', id)
    }
}

const controller = new ChatsController()

window.chatsController = controller

export default controller
