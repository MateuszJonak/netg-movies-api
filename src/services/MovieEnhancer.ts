import { IExternalAPI } from './IExternalAPI';
export abstract class MovieEnhancer {
  private api!: IExternalAPI;
  public abstract makeAPI(): IExternalAPI;

  public enrich(body: any) {
    this.api = this.makeAPI();
    const response = this.api.call();
    return {
      ...body,
      ...response,
    };
  }
}
