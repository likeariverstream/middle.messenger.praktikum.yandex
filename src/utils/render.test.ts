import { Block } from './block';
import { render } from './render';
import { expect } from 'chai';

describe('render', () => {
    it('should render element by query selector', () => {
        const query = '#root';
        const block = new Block({});
        const root = document.querySelector(query)
        expect(render(query, block)).to.equal(root);
    });

    it('should throw an error if root element not found', () => {
        const query = '#test';
        const block = new Block({});
        expect(() => render(query, block)).to.throw(Error, `root not found by selector '${query}'`);
    })
})
