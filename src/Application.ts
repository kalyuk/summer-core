import { Autowired } from './annotation/Autowired';
import { Container } from './core/Container';
import { EventService } from './service/EventService';

export class Application {

  get appContext() {
    return this;
  }

  @Autowired
  private eventService: EventService;

  constructor() {
    console.log(this.eventService);
  }

  public getInstance(target) {
    return Container.getContainer()
      .getInstance(target, this);
  }
}