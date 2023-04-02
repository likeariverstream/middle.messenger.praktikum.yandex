import { User } from 'api/auth-api'
import { Block } from '../../utils/block'
import template from './template.hbs'
import { Message } from '../message/message'
import { Input } from '../input/input'
import { Button } from '../button/button'
import styles from './styles.module.pcss'
import MessagesController, { Message as MessageInfo } from '../../controllers/message-controller'
import store, { withStore } from '../../hocs/withStore'
import ChatsController from '../../controllers/chats-controller'
import ProfileController from '../../controllers/profile-controller'

interface MessengerProps {
    selectedChat: number | undefined;
    messages: MessageInfo[];
    userId: number;
    searchUserMode: boolean
    deleteUserMode: boolean
    addUserMode: boolean
}

class MessengerBase extends Block<MessengerProps> {
    constructor(props: MessengerProps) {
        super(props)
    }

    protected init() {
        this.children.addUserButton = new Button({
            type: 'button',
            text: 'Добавить пользователя',
            events: {
                click: () => this.addUser(),
            },
        })
        this.children.searchUserButton = new Button({
            type: 'button',
            text: 'Найти пользователя',
            events: {
                click: () => this.searchUser(),
            },
        })
        this.children.deleteUserButton = new Button({
            type: 'button',
            text: 'Удалить пользователя',
            events: {
                click: () => this.deleteUser(),
            },
        })
        this.children.addUserInput = new Input({
            type: 'text',
            placeholder: 'Введите ID для добавления',
            name: 'add',
        })
        this.children.searchUserInput = new Input({
            type: 'text',
            placeholder: 'Введите логин',
            name: 'search',
        })
        this.children.deleteUserInput = new Input({
            type: 'text',
            placeholder: 'Введите ID для удаления',
            name: 'delete',
        })
        this.children.messages = this.createMessages(this.props)

        this.children.input = new Input({
            type: 'text',
            placeholder: 'Сообщение',
            name: 'message',
        })

        this.children.button = new Button({
            text: 'Отправить',
            type: 'button',
            events: {
                click: () => {
                    const input = this.children.input as Input
                    const message = input.getValue()
                    input.setValue('')
                    MessagesController.sendMessage(this.props.selectedChat!, message)
                },
            },
        })
    }

    private addUser() {
        this.props.addUserMode = true
        const value = (this.children.addUserInput as Input).getValue()
        if (value) {
            const userId = [Number(value)]
            ChatsController.addUserToChat(userId, this.props.selectedChat!).then(() => {
                const message = (this.children.addUserInput as Input).setValue('Пользователь добавлен')
                return message
            }).catch(() => (this.children.addUserInput as Input).setValue('Произошла ошибка'))
        }
    }

    private searchUser() {
        this.props.searchUserMode = true
        const login = (this.children.searchUserInput as Input).getValue()
        if (login) {
            const data = { login }
            ProfileController.searchUser(data).then(() => {
                const { id } = store.getState().userSearchResults.find((user: User) => user.login === login)
                return (this.children.searchUserInput as Input).setValue(id)
            }).catch(() => (this.children.searchUserInput as Input).setValue('Произошла ошибка'))
        }
    }

    private deleteUser() {
        this.props.deleteUserMode = true
        const value = (this.children.deleteUserInput as Input).getValue()
        if (value) {
            const userId = [Number(value)]
            ChatsController.deleteUserFromChat(userId, this.props.selectedChat!).then(() => {
                const message = (this.children.deleteUserInput as Input).setValue('Пользователь удален')
                return message
            }).catch(() => (this.children.deleteUserInput as Input).setValue('Произошла ошибка'))
        }
    }

    protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
        this.children.messages = this.createMessages(newProps)
        return true
    }

    private createMessages(props: MessengerProps) {
        return props.messages.map((data) => new Message({ ...data, isMine: props.userId === data.user_id }))
    }

    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props, styles })
    }
}

const withSelectedChatMessages = withStore((state) => {
    const selectedChatId = state.selectedChat

    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            userId: state.user.id,
        }
    }

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user.id,
    }
})

export const Messenger = withSelectedChatMessages(MessengerBase)
