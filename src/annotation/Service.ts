import { Container, ScopeType } from '../core/Container';

export function Service() {
  return (target) => {
    Container.register(target, ScopeType.singleton);
  };
}