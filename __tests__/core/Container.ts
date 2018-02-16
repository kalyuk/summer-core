import * as assert from 'assert';
import { Container } from '../../src/core/Container';

describe('core.Container', () => {
  class Context {
    private test: number = 1;

    public setTest(value: number) {
      this.test = value;
    }

    public getTest(): number {
      return this.test;
    }
  }

  class Context2 {
    public test: number = 3;
  }

  Container.set(Context2);
  Container.set(Context);

  it('should be create new Container', function () {
    const container = new Container(this);
    assert(container instanceof Container);
  });

  it('should be create new Container and get different instances', function () {
    const container1 = new Container(this);
    const context1 = container1.get(Context);
    context1.setTest(2);
    const container2 = new Container(this);
    assert.equal(2, context1.getTest());
    assert.equal(1, container2.get(Context).getTest());
  });

  it('should be set Class', function () {
    const container = new Container(this);
    container.bind(Context, Context2);
    assert(3, container.get(Context).test);
  });

  it('should be run error if get before bind', function () {
    const container = new Container(this);
    try {
      container.get(Context);
      container.bind(Context, Context2);
      assert(false);
    } catch (e) {
      assert(e.message === 'class can be replaced before calling');
    }
  });
});