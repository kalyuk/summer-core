import { Container, ScopeType } from '../core/Container';

export function Factory() {
  return (target) => {
    Container.register(target, ScopeType.factory);
  };
}