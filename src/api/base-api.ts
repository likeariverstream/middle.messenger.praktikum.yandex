import { HTTPTransport } from '../utils/http-transport'

export abstract class BaseAPI {
    protected http: HTTPTransport

    protected constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint)
    }
}
