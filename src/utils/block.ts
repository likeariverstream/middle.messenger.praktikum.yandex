import { EventBus } from "./event-bus"
import { v4 as makeUUID } from 'uuid'

export type Meta = {
  tagName: string
  props: {}
}
export type Props = {
  [key: string]: string
  (): () => void
}
export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  }

  _id: null | string = null
  _element: null | HTMLElement = null;
  _meta: Meta | null = null
  children = {}
  props:  Props
  eventBus: () => EventBus
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus()
    this._meta = {
      tagName,
      props
    }
    this._id = makeUUID()
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const tagName = this._meta?.tagName
    this._element = this._createDocumentElement(tagName)
    this._element?.classList.add(this.props.class)
    this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props)
  }

  init() {
    this._createResources();
  }

  _componentDidMount() {
    this.componentDidMount(this.props);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props)
  }

  componentDidMount(oldProps) {

  }
  emit(event) {

  }
  dispatchComponentDidMount() {
    this.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props)
    }
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    if (this._element) {
      this._element.innerHTML = block
    } else return
  }

  render() {
    return '';
  }

  getContent() {
      return this.element!
  }

  _makePropsProxy(props) {
    const self = this;
    return new Proxy(props, {
      get(target, p, receiver) {
        return typeof target[p] === "function" ? target[p].bind(target) : target[p]
      },
      set(target, p, value, receiver) {
        target[p] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target });
        return true
      },
      deleteProperty(target, name) {
        throw new Error('Нет доступа');
      }
    })
  }
  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _createDocumentElement(tagName) {
    const element = document.createElement(tagName)
    element.setAttribute('data-id', this._id)
    return element
  }

  show() {
    this.getContent().style.display = "block"
  }

  hide() {
    this.getContent().style.display = "none";
  }
}