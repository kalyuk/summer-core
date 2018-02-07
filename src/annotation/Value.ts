export function Value(key: string, defaultValue: any = null) {
  return (target, property): any => {
    if (!property) {
      throw new Error('value of bind only on method or property');
    }
    return {
      get: function () {
        // return this.getAppContext().getConfig(key) || defaultValue;
      }
    };
  };
}