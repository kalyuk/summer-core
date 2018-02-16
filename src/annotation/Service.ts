import { Container, ScopeType } from '../core/Container';

export function Service() {
  return (target) => {
    Container.set(target, ScopeType.singleton);
  };
}