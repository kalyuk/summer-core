import { Container } from './core/Container';

export class Application {
  public static run<T>(classContext: (new(...args) => T)) {
    Container.set(classContext);
    const container = new Container();
    return container.get(classContext);
  }
}