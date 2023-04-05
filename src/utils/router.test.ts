import  {router } from './router'
import { BlockConstructable } from './route';
import { expect } from 'chai';
import Sinon from 'sinon';
import { describe, it } from 'mocha';

describe('router', () => {

  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
  }

  const getContentFake = Sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  it('use() should return Router instance', () => {
    const result = router.use('/', BlockMock);

    expect(result).to.eq(router);
  });

  describe('.back()', () => {
    it('should render a page on history back action', () => {
      router
        .use('/', BlockMock)
        .start();

      router.back();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  it('should render a page on start', () => {
    router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });
});
