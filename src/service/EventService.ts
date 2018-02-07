import { Service } from '../annotation/Service';

@Service()
export class EventService {
  private events: Map<string, any[]> = new Map<string, any[]>();

  public on(event, callback: Function, priority = 100) {
    if (this.events.has(event)) {
      this.events.get(event).push([callback, priority]);
      this.events.get(event).sort((a, b) => a[1] - b[1]);
    } else {
      this.events.set(event, [[callback, priority]]);
    }
  }

  public async emit(event, ...params) {
    if (this.events.has(event)) {
      for (const [callback] of this.events.get(event)) {
        await callback(...params);
      }
    }
  }

}