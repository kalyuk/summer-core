import * as assert from 'assert';
import { Context } from '../../src/annotation/Context';
import { Value } from '../../src/annotation/Value';
import { Application } from '../../src/Application';

describe('annotation.Value', () => {
  it('should be return value', function () {

    @Context({default: {test: 'testValue'}})
    class ContextApp2 {

      @Value('test')
      private someTest;

      init() {
        super.init();
        assert(this.someTest === 'testValue');
      }
    }

    Application.run(ContextApp2);
  });
});