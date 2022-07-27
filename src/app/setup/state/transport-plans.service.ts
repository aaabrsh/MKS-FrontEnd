import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { TransportPlansStore, TransportPlansState } from './transport-plans.store';
import { TransportPlan } from '../models/transport-plan.model';

@Injectable({ providedIn: 'root' })
export class TransportPlansService {

  constructor(private transportPlansStore: TransportPlansStore,
    private http: HttpClient,
    private utilService: UtilService) {

  }



  get() {
    const url = `${environment.apiUrl}/transport_plans`;
    return this.http.get(url).pipe(
      tap({next: (response: any) => {
        if (response.success) {
          this.transportPlansStore.set(response.data);
        } else {
          this.utilService.showErrorMessage(response.error);
        }
      }, error: () => this.utilService.showErrorMessage('Error')})
    )
  }

  add(transportPlan: TransportPlan) {
    const url = `${environment.apiUrl}/transport_plans`;
    return this.http.post(url, {transportPlan}).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.transportPlansStore.add(response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }
  
  update(id: any, transportPlan: Partial<TransportPlan>) {
    const url = `${environment.apiUrl}/transport_plans/${id}`;
    return this.http.put(url, { transportPlan }).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.transportPlansStore.update(id, response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }
}