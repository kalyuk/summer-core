import { defaultsDeep } from 'lodash';
import { Container, ScopeType } from '../core/Container';

export enum BASE_EVENT {
  INITIALIZED = Symbol('initialized'),
  AFTER_INITIALIZE = Symbol('afterInitialize')
}

export function Context(config: any = {}) {
  return (target) => {
    const newClass = class extends target {
      public readonly arguments: {[propName: string]: string | number} = {
        env: 'development',
        port: 1987
      };

      public readonly events: Map<string, any[]> = new Map<string, any[]>();
      public readonly onceEvents: Map<string, any[]> = new Map<string, any[]>();
      public configuration: any = {};

      constructor(...props) {
        super(...props);
        process.argv.forEach((val) => {
          const tmp = val.split('=');
          if (tmp.length === 2) {
            this.arguments[tmp[0].replace('--', '').trim()] = tmp[1].trim();
          }
        });
        this.configuration = defaultsDeep(config[this.getArg('env')] || {}, config.default || {});
      }

      public init() {
        this.emit(BASE_EVENT.INITIALIZED)
          .then(() =>
            this.emit(BASE_EVENT.AFTER_INITIALIZE)
          );
      }

      public getConfig(key: string, defaultValue: any) {
        try {
          return key.split('.')
            .reduce((o, i) => o[i] ? o[i] : defaultValue, this.configuration);
        } catch (e) {
          return defaultValue;
        }
      }

      public getArg(key: string) {
        return this.arguments[key];
      }

      public on(event, callback: Function, priority = 10000) {
        if (this.events.has(event)) {
          this.events.get(event).push([callback, priority]);
          this.events.get(event).sort((a, b) => a[1] - b[1]);
        } else {
          this.events.set(event, [[callback, priority]]);
        }
      }

      public once(event, callback: Function, priority = 10000) {
        if (this.onceEvents.has(event)) {
          this.onceEvents.get(event).push([callback, priority]);
          this.onceEvents.get(event).sort((a, b) => a[1] - b[1]);
        } else {
          this.onceEvents.set(event, [[callback, priority]]);
        }
      }

      public async emit(event, ...params) {
        if (this.events.has(event)) {
          for (const [callback] of this.events.get(event)) {
            await callback(...params);
          }
        }

        if (this.onceEvents.has(event)) {
          for (const [callback] of this.onceEvents.get(event)) {
            await callback(...params);
          }
          this.onceEvents.delete(event);
        }
      }
    };

    Container.set(newClass, ScopeType.singleton, {type: context});

    return newClass;
  };
}