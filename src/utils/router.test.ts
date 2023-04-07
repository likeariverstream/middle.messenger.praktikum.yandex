import { Router, router } from './router'
import { expect } from 'chai'
import sinon from 'sinon'

describe('Router', () => {
    global.window.history.back = () => {
        if (typeof window.onpopstate === 'function') {
          window.onpopstate({currentTarget: window} as unknown as PopStateEvent)
        }
      }
      global.window.history.forward = () => {
        if (typeof window.onpopstate === 'function') {
          window.onpopstate({currentTarget: window} as unknown as PopStateEvent)
        }
      }
    
    
    it('should create Router instance', () => {
        expect(router).to.be.an.instanceOf(Router)
    })

    it('should work back', () => {
        const spyBack = sinon.spy(window.history, 'back')
        router.back()
        expect(spyBack.calledOnce).to.be.true
        spyBack.restore()
    })

    it('should work forward', () => {
        const spyForward = sinon.spy(window.history, 'forward')
        router.forward()
        expect(spyForward.calledOnce).to.be.true
        spyForward.restore()
    })
})
