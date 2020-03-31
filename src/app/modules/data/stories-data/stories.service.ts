import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Story } from '../../../interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class StoriesService {
  private readonly uri = `${environment.api}/good-news`;
  constructor(private Http: HttpClient) {}

  getStories(): Promise<Story[]> {
    return this.Http.get<Story[]>(this.uri).toPromise();
  }
}
