import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../../../interfaces';
import { environment } from '../../../../environments/environment';

@Injectable()
export class InfoService {
  private readonly uri = `${environment.api}/info-snippets`;

  constructor(private Http: HttpClient) {}

  getResources(): Promise<Resource[]> {
    return this.Http.get<Resource[]>(this.uri).toPromise();
  }
}
