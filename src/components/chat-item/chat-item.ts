import { Item } from '../item/item'
import { renderDOM } from '../../utils/render'

type Chat = { title: string, time: string, sender: string, message: string }

export const chatItem = (root: string, chats: Chat[]) => {
    chats.forEach((chat, index) => {
        const {
            title, time, sender, message,
        } = chat
        const listItem = new Item('li', {
            id: `item-${index}`,
            text: '',
            class: 'item',
        })
        const titleContainer = new Item('div', {
            id: `title-container-${index}`,
            text: '',
            class: 'container',
        })
        const nameChat = new Item('h4', {
            id: `title-${index}`,
            text: `${title}`,
            class: 'title',
        })
        const timeOfTheLastMessage = new Item('p', {
            id: `time-${index}`,
            text: `${time}`,
            class: 'time',
        })
        const messageContainer = new Item('div', {
            id: `message-container-${index}`,
            text: '',
            class: 'container',
        })
        const senderОfTheLastMessage = new Item('p', {
            id: `user-${index}`,
            class: 'user',
            text: `${sender}`,
        })
        const lastMessage = new Item('p', {
            id: `message-${index}`,
            class: 'message',
            text: `${message}`,
        })
        renderDOM(root, listItem)
        renderDOM(`#item-${index}`, titleContainer)
        renderDOM(`#item-${index}`, messageContainer)
        renderDOM(`#title-container-${index}`, nameChat)
        renderDOM(`#title-container-${index}`, timeOfTheLastMessage)
        renderDOM(`#message-container-${index}`, senderОfTheLastMessage)
        renderDOM(`#message-container-${index}`, lastMessage)
    })
}
