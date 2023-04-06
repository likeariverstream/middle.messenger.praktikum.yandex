import { expect } from 'chai'
import { Block } from './block'

describe('Block', () => {
    describe('constructor', () => {
      it('should create a new Block instance', () => {
        const block = new Block({})
        expect(block).to.be.an.instanceof(Block)
      })
  
      it('should assign a unique id', () => {
        const firstBlock = new Block({})
        const secondBlock = new Block({})
        expect(firstBlock.id).to.not.equal(secondBlock.id)
      })
  
    })
  
    describe('getContent method', () => {
      it('should return _element', () => {
        const block = new Block({})
        expect(block.getContent()).to.equal(block.element)
      })
    })
  
    describe('componentDidMount method', () => {
      it('should be called after constructor', () => {
        const block = new Block({})
        block.dispatchComponentDidMount()
        expect(block.componentDidMount).to.have.been
      })
    })
    
  })
