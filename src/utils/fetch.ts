enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type Options = {
    method?: METHODS
    data?: any
    timeout?: number
    headers?: {
        [key: string]: string
    }
}
type OptionsWithoutMethod = Omit<Options, 'method'>
type Fetch = (url: string, options?: Options, timeout?: number) => Promise<XMLHttpRequest>

const queryStringify = (data: OptionsWithoutMethod) => {
    if (typeof data !== 'object') {
        throw new Error('Data must be object')
    }

    const keys = Object.keys(data)
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?')
}

export class HTTPTransport {
    get: Fetch = (url, options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout)

    post: Fetch = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout)

    put: Fetch = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout)

    delete: Fetch = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)

    request: Fetch = (url, options = {}, timeout = 5000) => {
        const { headers = {}, method, data } = options
        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method')
                return
            }
            const xhr = new XMLHttpRequest()
            const isGet = method === METHODS.GET
            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            )
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key])
            })

            xhr.onload = function () {
                resolve(xhr)
            }
            xhr.onabort = reject
            xhr.onerror = reject
            xhr.timeout = timeout
            xhr.ontimeout = reject

            if (isGet || !data) {
                xhr.send()
            } else {
                xhr.send(data)
            }
        })
    }
}
