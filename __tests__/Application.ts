import * as assert from 'assert';
import { Context } from '../src/annotation/Context';
import { Service } from '../src/annotation/Service';
import { Application } from '../src/Application';

const config = {
  default: {}
};

class SameService {
  public serviceName = 'Service';
}

describe('Application', () => {

  it('should be create new context', function () {
    @Context(config)
    class ContextApp1 {
      public test = 1;
    }

    const context = Application.run(ContextApp1);
    assert.equal(1, context.test);
  });

  it('should be inject into constructor', function () {
    let name = null;

    @Context(config)
    class ContextApp {
      constructor(sn: SameService) {
        name = sn.serviceName;
      }
    }

    Application.run(ContextApp);

    assert(name === 'Service');
  });

});