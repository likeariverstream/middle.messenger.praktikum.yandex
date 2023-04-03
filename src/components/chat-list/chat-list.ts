import { Block } from '../../utils/block'
import template from './template.hbs'
import { Chat } from '../chat/chat'
import styles from './styles.module.pcss'
import { withStore } from '../../hocs/withStore'
import { ChatInfo } from '../../api/chat-api'
import ChatsController from '../../controllers/chats-controller'
import { Link } from '../link/link'
import { Button } from '../button/button'
import { Input } from '../input/input'

interface ChatsListProps {
    chats: ChatInfo[]
    isLoaded: boolean
    createChatMode: boolean
}

class ChatsListBase extends Block<ChatsListProps> {
    constructor(props: ChatsListProps) {
        super({ ...props })
    }

    protected init() {
        this.children.chats = this.createChats(this.props)
        this.children.button = new Button({
            type: 'button',
            text: 'Создать чат',
            events: {
                click: () => this.createNewChat(),
            },
        })
        this.children.input = new Input({
            type: 'text',
            placeholder: 'Название чата',
            name: 'name',
        })
        this.children.profileLink = new Link({ to: '/settings', text: 'Профиль' })
    }

    protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
        this.children.chats = this.createChats(newProps)
        return true
    }

    createNewChat() {
        this.props.createChatMode = !this.props.createChatMode
        const data = (this.children.input as Input).getValue()
        if (data) {
            ChatsController.create(data).then(() => {
                this.props.createChatMode = false
            }).catch(() => (this.children.input as Input).setValue('Что-то пошло не так'))
        }
    }

    private createChats(props: ChatsListProps) {
        return props.chats.map((data) => new Chat({
            ...data,
            events: {
                click: () => {
                    ChatsController.selectChat(data.id)
                },
            },
        }))
    }

    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props, styles })
    }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }))

export const ChatsList = withChats(ChatsListBase)
