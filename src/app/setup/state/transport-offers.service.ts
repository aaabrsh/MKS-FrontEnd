import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { TransportOffer } from '../models/transport-offer.model';
import { TransportOffersStore } from './transport-offers.store';

@Injectable({ providedIn: 'root' })
export class TransportOffersService {

  constructor(private transportOffersStore: TransportOffersStore,
    private http: HttpClient,
    private utilService: UtilService) {
  }


  get() {
    const url = `${environment.apiUrl}/transport_offers`;
    return this.http.get(url).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.transportOffersStore.set(response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

  add(transportOffer: TransportOffer) {
    const url = `${environment.apiUrl}/transport_offers`;
    return this.http.post(url, transportOffer).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.transportOffersStore.add(response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

  update(id: any, transportOffer: Partial<TransportOffer>) {
    const url = `${environment.apiUrl}/transport_offers/${id}`;
    return this.http.put(url, transportOffer).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.transportOffersStore.update(id, response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

  remove(id: ID) {
    const url = `${environment.apiUrl}/transport_offers/${id}`;
    return this.http.delete(url).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.transportOffersStore.remove(id);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

}
