import { IExternalAPI } from './IExternalAPI';

export class OMDbAPI implements IExternalAPI {
  public call() {
    return Promise.resolve('trol');
  }
}
