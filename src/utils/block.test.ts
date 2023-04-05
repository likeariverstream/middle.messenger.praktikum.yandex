import { assert } from 'chai';
import { Block } from './block';
import Sinon from 'sinon';
import { describe, it } from 'mocha';

describe('Block', () => {
  it('should render a div with correct ID', () => {
    const block = new Block({});

    const content = block.getContent();
    if (content) {
        assert.isNotNull(content);
        assert.equal(content.tagName, 'DIV');
        assert.equal(content.getAttribute('data-id'), block.id);
    }
  });

  it('should render children components', () => {
    const child = new Block({});
    const block = new Block({ child });

    const content = block.getContent();

    assert.isNotNull(content);
    if (content) {
        assert.equal(content.children.length, 1);
        assert.equal(content.children[0].getAttribute('data-id'), child.id);
    }
  });

  it('should call componentDidMount on mount', () => {
    const componentDidMountSpy = Sinon.spy();
    class TestBlock extends Block {
      componentDidMount() {
        componentDidMountSpy();
      }
    }
    const block = new TestBlock({});
    block.dispatchComponentDidMount();
    Sinon.assert.calledOnce(componentDidMountSpy);
  });

  it('should call componentDidUpdate on props update', () => {
    const componentDidUpdateSpy = Sinon.spy();
    class TestBlock extends Block {
      componentDidUpdate() {
        componentDidUpdateSpy()
        return true
      }
    }

    const block = new TestBlock({});
    block.setProps({});

    Sinon.assert.calledOnce(componentDidUpdateSpy);
  });
});
