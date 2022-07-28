import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { RoutesStore, RoutesState } from './routes.store';
import { Route } from '../models/route.model';

@Injectable({ providedIn: 'root' })
export class RoutesService  {

  constructor(protected store: RoutesStore,private http: HttpClient,
    private utilService: UtilService) {
  }

  get() {
    const url = `${environment.apiUrl}/routes`;
    return this.http.get(url).pipe(
      tap({next: (response: any) => {
        if (response.success) {
          response.data.map((res:any)=>{
            // res.region_id = res.region.name;
            // res.destination = res.destination.name;
            // res.source_id =res.source.name
                      
          });
          this.store.set(response.data);
         
        } else {
          this.utilService.showErrorMessage(response.error);
        }
      }, error: () => this.utilService.showErrorMessage('Error')})
    )
  }

  add(route: Route) {
    const url = `${environment.apiUrl}/routes`;
    return this.http.post(url, {route}).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.store.add(response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

  update(id: any, route: Partial<Route>) {
    const url = `${environment.apiUrl}/routes/${id}`;
    return this.http.put(url, {route}).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.store.update(id, response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }
}
