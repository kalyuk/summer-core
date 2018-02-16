export function Value(key: string | Function, defaultValue: any) {
  return (target, property): any => {
    if (!property) {
      throw new Error('Value decorator work only on property');
    }
    return {
      get: function () {
        if (typeof key === 'string') {
          return this.context.getConfig(key) || defaultValue;
        }
        return key(defaultValue);
      }
    };
  };
}