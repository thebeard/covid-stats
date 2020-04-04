import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Story } from '../../../interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class StoriesService {
  private readonly uri = `${environment.api}/good-news`;
  constructor(private Http: HttpClient) {}

  getStories(): Promise<Story[]> {
    return this.Http.get<Story[]>(this.uri)
      .pipe(map(stories => stories.sort((a, b) => new Date(a.date_published).getTime() - new Date(b.date_published).getTime())))
      .toPromise();
  }
}
