import { Store, StoreEvents } from '../utils/store'
import { Block } from '../utils/block'
import { User } from '../api/auth-api'
import { ChatInfo } from '../api/chat-api'
import { Message } from '../controllers/message-controller'

interface State {
    user: User
    chats: ChatInfo[]
    messages: Record<number, Message[]>
    selectedChat?: number
    userSearchResults: []
    searchMode?: boolean
}

export const store = new Store()

export function withStore<SP extends Partial<any>>(mapStateToProps: (state: State) => SP) {
    return function wrap<P>(Component: typeof Block<SP & P>) {
        return class WithStore extends Component {
            constructor(props: Omit<P, keyof SP>) {
                let previousState = mapStateToProps(store.getState())

                super({ ...(props as P), ...previousState })

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState())

                    previousState = stateProps

                    this.setProps({ ...stateProps })
                })
            }
        }
    }
}
