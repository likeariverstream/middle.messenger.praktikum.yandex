import { Block } from '../../utils/block'
import template from './template.hbs'
import { ChatsList } from '../../components/chat-list/chat-list'
import { Messenger } from '../../components/messenger/messenger'
import styles from './styles.module.pcss'
import ChatsController from '../../controllers/chats-controller'

export class MessengerPage extends Block {
    constructor() {
        super({})
    }

    protected init() {
        this.children.chatsList = new ChatsList({ isLoaded: false, createChatMode: false })
        this.children.messenger = new Messenger({
            searchUserMode: false,
            deleteUserMode: false,
            addUserMode: false,
        })
        ChatsController.fetchChats().finally(() => {
            (this.children.chatsList as Block).setProps({
                isLoaded: true,
            })
        })
    }

    protected render(): DocumentFragment {
        return this.compile(template, { styles })
    }
}
