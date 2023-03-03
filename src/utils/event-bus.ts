import { Props } from './block'

export class EventBus {
    listeners: { [event: string]: Array<(props: any) => void> }

    constructor() {
        this.listeners = {}
    }

    on(event: string, callback: (props: Props, newProps?: Props) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(callback)
    }

    off(event: string, callback: (props: Props) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`)
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener: (props: Props) => void) => listener !== callback,
        )
    }

    emit(event: string, ...args: [() => void]) {
        if (!this.listeners[event]) {
            throw new Event(`Нет события: ${event}`)
        }

        this.listeners[event].forEach((listener: (arg0: () => void) => void) => {
            listener(...args)
        })
    }
}
