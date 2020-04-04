import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { LoaderService } from '../../../services';
import { ResourcesService } from './resources.service';
import { Resource } from '../../../interfaces';

@Injectable()
export class ResourcesResolver implements Resolve<Resource[]> {
  constructor(private Info: ResourcesService, private Loader: LoaderService) {}

  resolve(): Promise<Resource[]> {
    this.Loader.setRouteLoader();
    return this.Info.getResources().finally(() => this.Loader.setRouteLoader(false));
  }
}
