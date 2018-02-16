import * as assert from 'assert';
import { Autowired } from '../../src/annotation/Autowired';
import { Context } from '../../src/annotation/Context';
import { Service } from '../../src/annotation/Service';
import { Application } from '../../src/Application';

describe('annotation.Autowired', () => {
  it('should be pass service into property ', function () {

    @Service()
    class SomeService {
      public test: string = 'testValue';
    }

    @Context()
    class ContextApp2 {

      @Autowired()
      private someService: SomeService;

      constructor() {
        assert(this.someService.test === 'testValue');
      }
    }

    Application.run(ContextApp2);

  });
});