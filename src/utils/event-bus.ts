export class EventBus {
    listeners: {};
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: () => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
  }
    off(event: string, callback: () => void) {
        if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
        (      listener: () => void) => listener !== callback
    );
  }

    emit(event: string, ...args: [() => void]) {
        if (!this.listeners[event]) {
                throw new Event(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener: (arg0: () => void) => void) => {
            listener(...args);
        });
    }
} 