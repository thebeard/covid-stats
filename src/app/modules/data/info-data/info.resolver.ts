import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { InfoService } from './info.service';
import { LoaderService } from '../../state/loader';
import { Resource } from '../../../interfaces';

@Injectable()
export class InfoResolver implements Resolve<Resource[]> {
  constructor(private Info: InfoService, private Loader: LoaderService) {}

  resolve(): Promise<Resource[]> {
    this.Loader.setRouteLoader();
    return this.Info.getResources().finally(() => this.Loader.setRouteLoader(false));
  }
}
