import { Service } from '../annotation/Service';
import { Value } from '../annotation/Value';

@Service()
export class HttpService {

  @Value('summer-core.http.host', '0.0.0.0')
  private readonly HOST: string;

  @Value('summer-core.http.timeout', 30)
  private readonly TIMEOUT: number;

  @Value('summer-core.http.port', 1987)
  private readonly PORT: number;

  @Value('summer-core.http.body-size', 1e6)
  private readonly MAX_POST_BODY_LEN: number;

  @Value('summer-core.http.cors', true)
  private readonly ENABLE_CORS: boolean;

  @Value('summer-core.http.cors-origin', '*')
  private readonly CORS_HEADER_ORIGIN: string;

  @Value('summer-core.http.cors-methods', '*')
  private readonly CORS_HEADER_METHODS: string;

  @Value('summer-core.http.cors-max-age', 1728000)
  private readonly CORS_HEADER_MAX_AGE: number;

  @Value('summer-core.http.cors-headers', '*')
  private readonly CORS_HEADER_HEADERS: string;

}