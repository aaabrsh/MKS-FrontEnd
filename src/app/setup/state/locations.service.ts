import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { filter, map, tap } from 'rxjs/operators';
import { Location } from '../models/location.model';
import { LocationsStore } from './locations.store';
import { TreeNode } from 'primeng/api';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationsService {

  constructor(protected locationsStore: LocationsStore, private http: HttpClient,
    private utilService: UtilService) {

  }

  getRegions() {
    const url = `${environment.apiUrl}/locations`;
    var regions: TreeNode[] = [];    
    this.http.get(url).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            response.data.map(
              (res: any) => {
                if (res.location_type == 'Region') {
                  let temp: TreeNode = {
                    data: {
                      code: res.code,
                      description: res.description,
                      id: res.id,
                      location_type: res.location_type,
                      name: res.name,
                    },
                    leaf: false
                  };

                  regions.push(temp);
                }
              }
            );
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    ).subscribe();

    return of(regions);
  }

  getChildren(id: number){
    const url = `${environment.apiUrl}/locations/${id}/children`;
    var children: TreeNode[] = [];

    // var subject = new Subject<TreeNode>();

    this.http.get(url).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            response.data.map(
              (res: any) => {
                  let temp: TreeNode = {
                    data: {
                      code: res.code,
                      description: res.description,
                      id: res.id,
                      location_type: res.location_type,
                      name: res.name,
                    },
                    leaf: false
                  };
                  children.push(temp);
                  // subject.next(temp);
                }
            );
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    ).subscribe();

    return of(children);
  }

  get(){
    const url = `${environment.apiUrl}/locations`;
    return this.http.get(url).pipe(
      tap({next: (response: any) => {
        if (response.success) {
           this.locationsStore.set(response.data);        
        } else {
          this.utilService.showErrorMessage(response.error);
        }
      }, error: () => this.utilService.showErrorMessage('Error')})
    )
  }

  add(location: Location) {
    const url = `${environment.apiUrl}/locations`;
    return this.http.post(url, { location }).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.locationsStore.add(response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

  update(id: any, location: Partial<Location>) {
    const url = `${environment.apiUrl}/locations/${id}`;
    return this.http.put(url, { location }).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.locationsStore.update(id, response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }
}
