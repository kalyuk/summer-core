const counter: number = 0;

export class RequestContext {
  private index: number = 0;

  constructor(public hostname: string,
              public headers,
              public method: string,
              public url: string,
              public ip: string,
              public path: any = {},
              public query: any = {},
              public body: any = '') {
    counter += 1;
    this.index = counter;
  }

  public getIndex() {
    return this.index;
  }
}