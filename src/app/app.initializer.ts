import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export function AppInitializer(Http: HttpClient) {
  return () => {
    return Http.get('/assets/environment.json')
      .toPromise()
      .then(json => {
        Object.assign(environment, json);
      });
  };
}
