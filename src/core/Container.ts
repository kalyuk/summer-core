import 'reflect-metadata';

export enum ScopeType {
  singleton = 'singleton',
  factory = 'factory'
}

export interface ContainerOptions {
  scopeType: ScopeType;
}

interface TargetOptions {
  map?: any;
  instance?: new (...args) => void;
}

export class Container {
  private static readonly registry: Map<Function, ContainerOptions> = new Map<Function, ContainerOptions>();
  private readonly registry: Map<Function, TargetOptions> = new Map<Function, TargetOptions>();
  private appContext: any = null;

  public static set(classLink: Function, scopeType: ScopeType = ScopeType.singleton, options = {}) {
    Container.registry.set(classLink, {...options, scopeType});
  }

  public static getOptions(classLink): ContainerOptions {
    if (!Container.registry.has(classLink)) {
      Container.registry.set(classLink, {scopeType: ScopeType.factory});
    }
    return Container.registry.get(classLink);
  }

  public get<T>(classLink: (new(...args) => T)) {
    const staticOptions = Container.getOptions(classLink);
    const options = this.registry.get(classLink) || {};

    if (!this.appContext) {
      this.appContext = this;
    }
    let instance = null;
    if (!options || !options.instance) {
      const target = this.getMappingClassLink(classLink);

      // tslint:disable-next-line
      const $this = this;

      class Instance extends target {
        public get container() {
          return $this;
        }

        public get context() {
          return $this.appContext || this;
        }
      }

      const params = (Reflect.getMetadata('design:paramtypes', classLink) || [])
        .map((param) => param ? this.get(param) : void(0));

      instance = new (Instance as any)(...params);

      if (staticOptions.scopeType === ScopeType.singleton) {
        options.instance = instance;
        this.registry.set(classLink, {instance});
      }
    }

    return instance;
  }

  public bind(classLink, newClassLink) {
    const options = this.registry.get(classLink) || {};
    options.map = newClassLink;
    if (options.instance) {
      throw new Error('class can be replaced before calling');
    }
    this.registry.set(classLink, options);
  }

  private getMappingClassLink(target) {
    const options = this.registry.get(target);
    if (options && options.map) {
      return options.map;
    }
    return target;
  }
}