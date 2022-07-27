import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { TransportPlanItemsStore} from './transport-plan-items.store';
import { TransportPlanItem } from '../models/transport-plan-item.model';


@Injectable({ providedIn: 'root' })
export class TransportPlanItemsService  {

  constructor(private transportPlanItemsStore: TransportPlanItemsStore,
    private http: HttpClient,
    private utilService: UtilService) {

  }



  get() {
    const url = `${environment.apiUrl}/transport_plan_items`;
    return this.http.get(url).pipe(
      tap({next: (response: any) => {
        if (response.success) {
          this.transportPlanItemsStore.set(response.data);
        } else {
          this.utilService.showErrorMessage(response.error);
        }
      }, error: () => this.utilService.showErrorMessage('Error')})
    )
  }

  add(transportPlanItem: TransportPlanItem) {
    const url = `${environment.apiUrl}/transport_plan_items`;
    return this.http.post(url, {transportPlanItem}).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.transportPlanItemsStore.add(response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }
  
  update(id: any, transportPlanItem: Partial<TransportPlanItem>) {
    const url = `${environment.apiUrl}/transport_plan_items/${id}`;
    return this.http.put(url, { transportPlanItem }).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.transportPlanItemsStore.update(id, response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }





}
