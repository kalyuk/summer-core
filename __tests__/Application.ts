import { Service } from '../build/annotation/Service';
import { Application } from '../build/Application';

@Service()
export class Gateway {
  public test() {
    console.log('tttt')
  }
}

describe('Application', () => {

  const app = new Application();
  const g = app.getInstance(Gateway);
  g.test();
});