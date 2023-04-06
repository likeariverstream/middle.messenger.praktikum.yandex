import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon'
import {HTTPTransport} from './http-transport'
import { expect } from 'chai'

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic
  let instance: HTTPTransport
  const requests: SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest()

    // @ts-ignore
    global.XMLHttpRequest = xhr

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    })

    instance = new HTTPTransport('/auth')
  })

  afterEach(() => {
    requests.length = 0
  })

  it('.get() should send GET request', () => {
    instance.get('/user')

    const [request] = requests

    expect(request.method).to.eq('Get')
  })
  it('.post() should send POST request', () => {
    instance.post('/user')

    const [request] = requests

    expect(request.method).to.eq('Post')
  })


 it('.put() should send PUT request', () => {
    const data = 'test'
    instance.put(data, '/user')

    const [request] = requests

    expect(request.method).to.eq('Put')
  })


it('.delete() should send DELETE request', () => {
    instance.delete('/user')

    const [request] = requests

    expect(request.method).to.eq('Delete')
  })
})
