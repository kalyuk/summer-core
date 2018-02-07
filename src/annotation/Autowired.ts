export function Autowired<T>(target: T, property: string): any {
  if (!property) {
    throw new Error('value of bind only property');
  }

  const input = Reflect.getMetadata('design:type', target, property);

  return {
    get: function (): T {
      return this.appContext.getInstance(input);
    }
  };
}