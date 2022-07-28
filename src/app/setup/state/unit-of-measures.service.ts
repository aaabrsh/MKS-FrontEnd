import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { UnitOfMeasure } from '../models/unit-of-measure.model';
import { UnitOfMeasuresStore }  from './unit-of-measures.store';

@Injectable({ providedIn: 'root' })
export class UnitOfMeasuresService {
  constructor(private unitOfMeasuresStore: UnitOfMeasuresStore,
    private http: HttpClient,
    private utilService: UtilService) {

  }



  get() {
    const url = `${environment.apiUrl}/unit_of_measures`;
    return this.http.get(url).pipe(
      tap({next: (response: any) => {
        if (response.success) {
          this.unitOfMeasuresStore.set(response.data);
        } else {
          this.utilService.showErrorMessage(response.error);
        }
      }, error: () => this.utilService.showErrorMessage('Error')})
    )
  }

  add(unitOfMeasure: UnitOfMeasure) {
    const url = `${environment.apiUrl}/unit_of_measures`;
    return this.http.post(url, {unitOfMeasure}).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.unitOfMeasuresStore.add(response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

  update(id: any, unitOfMeasure: Partial<UnitOfMeasure>) {
    const url = `${environment.apiUrl}/unit_of_measures/${id}`;
    return this.http.put(url, { unitOfMeasure }).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.unitOfMeasuresStore.update(id, response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

}