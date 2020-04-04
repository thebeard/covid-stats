import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoaderService } from '../../../services';
import { StoriesService } from './stories.service';
import { Story } from '../../../interfaces';

@Injectable()
export class StoriesResolver implements Resolve<Story[]> {
  constructor(private Loader: LoaderService, private Stories: StoriesService) {}

  resolve(): Promise<Story[]> {
    this.Loader.setRouteLoader();
    return this.Stories.getStories().finally(() => this.Loader.setRouteLoader(false));
  }
}
