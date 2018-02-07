import 'reflect-metadata';
import { Application } from '../Application';

export enum ScopeType {
  singleton = 'singleton',
  factory = 'factory'
}

export interface ContainerOptions {
  scopeType: ScopeType;
}

export class Container {
  private static container: Container;
  private static registry: Map<any, ContainerOptions> = new Map<any, ContainerOptions>();

  public static getContainer() {
    if (!Container.container) {
      Container.container = new Container();
    }
    return Container.container;
  }

  public static setContainer(container: Container) {
    Container.container = container;
  }

  public static extendContainer = (container: Container) => {
    console.log('need to be implemented');
  }

  public static register(target, scopeType: ScopeType) {
    Container.registry.set(target, {scopeType});
  }

  public getInstance(target: any, context: Application) {
    const options = Container.registry.get(target);
    if (!(context as any).__beanCache) {
      (context as any).__beanCache = {};
    }
    if ((context as any).__beanCache[target]) {
      return (context as any).__beanCache[target];
    }

    const params = (Reflect.getMetadata('design:paramtypes', target) || [])
      .map((param) => param ? this.getInstance(param, context) : void(0));

    // tslint:disable-next-line
    const Instance = class extends target {
      public get appContext(): Application {
        return context;
      }
    };

    const instance = new (Instance as any)(...params);
    if (options.scopeType === ScopeType.singleton) {
      (context as any).__beanCache[target] = instance;
    }

    return instance;
  }
}