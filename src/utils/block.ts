import { v4 as makeUUID } from 'uuid'
import Handlebars, { template } from 'handlebars'
import { EventBus } from './event-bus'

export type Props = {
    [key: string]: any
    (): () => void
    (): (props: void) => void
}
export type Children = Block | Block[] | {}
type Meta = {
    tagName: string
    props: {}
}
type PropsAndChildren = Props | Children
export class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    }

    _id: null | string = null

    id = this._id

    _element: null | HTMLElement = null

    _meta: Meta | null = null

    children: Children = {}

    props: Props

    propsAndChildren: PropsAndChildren = {}

    eventBus: () => EventBus

    constructor(tagName = 'div', propsAndChildren: PropsAndChildren = {}) {
        const { children, props } = this._getChildren(propsAndChildren)
        this.children = children
        const eventBus = new EventBus()
        this._meta = {
            tagName,
            props,
        }
        this._id = makeUUID()
        this.props = this._makePropsProxy({ ...props, _id: this._id })
        this.eventBus = () => eventBus
        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT, this.props)
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    _createResources() {
        const tagName = this._meta?.tagName
        this._element = this._createDocumentElement(tagName)
        this._element?.classList.add(this.props.class)
        this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props)
    }

    init() {
        this._createResources()
    }

    _componentDidMount() {
        this.componentDidMount(this.props)
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props)
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount()
        })
    }

    componentDidMount(oldProps: Props) {
        console.log(oldProps)
    }

    emit(event: string) {
        console.log(event)
    }

    dispatchComponentDidMount() {
        this.emit(Block.EVENTS.FLOW_CDM)
    }

    _componentDidUpdate(oldProps: Props, newProps: Props): void {
        const response = this.componentDidUpdate(oldProps, newProps)
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props)
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        console.log(oldProps, newProps)
        return true
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return
        }
        Object.assign(this.props, nextProps)
    }

    get element() {
        return this._element
    }

    _render() {
        const block = this.render()
        this._removeEvents()
        this._element!.innerHTML = ''
        this._element?.append(block)
        this._addEvents()
    }

    _getChildren(propsAndChildren: PropsAndChildren) {
        const children: { [key: string]: string } = {}
        const props: { [key: string]: string } = {}

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value) {
                children[key] = value
            } else {
                props[key] = value
            }
        })

        return { children, props }
    }

    compile(template: any, props: Props) {
        const propsAndStubs = { ...props }
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child.id}"></div>`
        })
        const fragment = this._createDocumentElement('template')
        fragment.innerHTML = Handlebars.compile(template, propsAndStubs)
        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child.id}"]`)
            stub.replaceWith(child.getContent())
        })
        return fragment.content
    }

    render() {
        return this.compile(template, this.props)
    }

    getContent() {
        return this.element!
    }

    _makePropsProxy(props: any) {
        return new Proxy(props, {
            get: (target, p) => (typeof target[p] === 'function'
                ? target[p].bind(target) : target[p]),
            set: (target, p, value) => {
                target[p] = value
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target })
                return true
            },
            deleteProperty(/* target, name */) {
                throw new Error('Нет доступа')
            },
        })
    }

    _addEvents() {
        const { events = {} } = this.props
        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName])
        })
    }

    _removeEvents() {
        const { events = {} } = this.props
        Object.keys(events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, events[eventName])
        })
    }

    _createDocumentElement(tagName: any) {
        const element = document.createElement(tagName)
        element.setAttribute('data-id', this._id)
        return element
    }

    show() {
        this.getContent().style.display = 'block'
    }

    hide() {
        this.getContent().style.display = 'none'
    }
}
