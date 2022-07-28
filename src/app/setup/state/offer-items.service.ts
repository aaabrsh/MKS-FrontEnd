import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { OfferItem } from '../models/offer-item.model';
import { OfferItemsStore } from './offer-items.store';

@Injectable({ providedIn: 'root' })
export class OfferItemsService {

  offer_items: OfferItem[] = [
    {id: 1, transport_offer_id: 1, transport_bid_item_id: 1, price: 10000, winner: false, rank: 2},
    {id: 2, transport_offer_id: 1, transport_bid_item_id: 2, price: 20000, winner: true, rank: 1},
    {id: 3, transport_offer_id: 2, transport_bid_item_id: 1, price: 15000, winner: true, rank: 1},
    {id: 4, transport_offer_id: 2, transport_bid_item_id: 2, price: 18000, winner: false, rank: 2},
    {id: 5, transport_offer_id: 2, transport_bid_item_id: 2, price: 17500, winner: false, rank: 3}
  ];

  constructor(private offerItemsStore: OfferItemsStore,
    private http: HttpClient,
    private utilService: UtilService) {
  }


  get(id?: any) {
    // if(id){
    //   var filtered_items: OfferItem[] = [];
    //   for (const offerItem of this.offer_items) {
    //     if(offerItem.transport_offer_id == id){
    //       filtered_items.push(offerItem);
    //     }
    //   }
    //   this.offerItemsStore.set(filtered_items);
    // }else{
    //   this.offerItemsStore.set(this.offer_items);
    // }

    const url = `${environment.apiUrl}/transport_offer_items`;
    return this.http.get(url).pipe(
      tap({next: (response: any) => {
        if (response.success) {
          for (let i = 0; i < response.data.length; i++) {

            response.data[i].transport_bid_item_id = response.data[i].transport_bid_item.id;
            response.data[i].transport_bid_reference_no = response.data[i].transport_bid_item.transport_bid_reference_no;

          }
          this.offerItemsStore.set(response.data);
        } else {
          this.utilService.showErrorMessage(response.error);
        }
      }, error: () => this.utilService.showErrorMessage('Error')})
    )
  }

  add(OfferItem: OfferItem) {

    const url = `${environment.apiUrl}/transport_offer_items`;
    return this.http.post(url, OfferItem).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            response.data.transport_bid_item_id = response.data.transport_bid_item.id;
            response.data.transport_bid_reference_no = response.data.transport_bid_item.transport_bid_reference_no;
            this.offerItemsStore.add(response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

  update(id: any, OfferItem: Partial<OfferItem>) {
    const url = `${environment.apiUrl}/transport_offer_items/${id}`;
    return this.http.put(url,  OfferItem).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
          
            response.data.transport_bid_item_id = response.data.transport_bid_item.id;
            response.data.transport_bid_reference_no = response.data.transport_bid_item.transport_bid_reference_no;

            this.offerItemsStore.update(id, response.data);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

  remove(id: ID) {
    // this.offerItemsStore.remove(id);

    const url = `${environment.apiUrl}/transport_offer_items/${id}`;
    return this.http.delete(url).pipe(
      tap({
        next: (response: any) => {
          if (response.success) {
            this.offerItemsStore.remove(id);
          } else {
            this.utilService.showErrorMessage(response.error);
          }
        }, error: () => this.utilService.showErrorMessage('Error')
      })
    )
  }

}
