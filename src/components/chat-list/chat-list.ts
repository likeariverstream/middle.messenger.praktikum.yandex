import { Block } from '../../utils/block'
import template from './template.hbs'
import { Chat } from '../chat/chat'
import styles from './styles.module.pcss'
import { withStore } from '../../hocs/withStore'
import { ChatInfo } from '../../api/chat-api'
import ChatsController from '../../controllers/chats-controller'
import { Link } from '../link/link'

interface ChatsListProps {
    chats: ChatInfo[];
    isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {
    constructor(props: ChatsListProps) {
        super({ ...props })
    }

    protected init() {
        this.children.chats = this.createChats(this.props)
        this.children.profileLink = new Link({ to: '/profile', label: 'Профиль' })
    }

    protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
        this.children.chats = this.createChats(newProps)
        // if (oldProps) {
        //     return !!oldProps
        // }
        return true
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
