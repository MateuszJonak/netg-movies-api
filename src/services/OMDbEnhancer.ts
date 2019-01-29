import { MovieEnhancer } from './MovieEnhancer';
import { OMDbAPI } from './OMDbAPI';

export class OMDbEnhancer extends MovieEnhancer {
  public makeAPI() {
    return new OMDbAPI();
  }
}
