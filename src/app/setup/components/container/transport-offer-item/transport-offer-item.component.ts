import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, tap } from 'rxjs';
import { EMPTY_OFFER_ITEM, OfferItem } from 'src/app/setup/models/offer-item.model';
import { OfferItemsQuery } from 'src/app/setup/state/offer-items.query';
import { OfferItemsService } from 'src/app/setup/state/offer-items.service';
import { Column } from 'src/app/shared/models/column.model';
import { TransportOfferItemFormComponent } from '../../ui/transport-offer-item-form/transport-offer-item-form.component';
import { ActivatedRoute } from '@angular/router';
import { TransportBidItemService } from 'src/app/setup/state/state/transport-bid-item.service';
import { TransportBidItemQuery } from 'src/app/setup/state/state/transport-bid-item.query';
import { TransportBidItem } from 'src/app/setup/models/transport_bid_item.model';
import { TransportOffer } from 'src/app/setup/models/transport-offer.model';
import { TransportOffersQuery } from 'src/app/setup/state/transport-offers.query';
import { TransportOffersService } from 'src/app/setup/state/transport-offers.service';
@Component({
  selector: 'app-transport-offer-item',
  templateUrl: './transport-offer-item.component.html',
  styleUrls: ['./transport-offer-item.component.scss']
})
export class TransportOfferItemComponent implements OnInit {

  actions: any[] = [
    { color: 'success', label: 'New', disabled: false, icon: 'add_circle' }
  ];

  tableActions: any[] = [
    { icon: 'edit', color: 'warn', tooltip: 'Edit' },
  ]

  columns: Column[] = [
    { name: 'transport_offer_id', label: 'Transport Offer' },
    { name: 'transport_bid_item_id', label: 'Transport Bid Item ID' },
    { name: 'price', label: 'Offer Date' },
  ];

  offerItems: OfferItem[] = [];

  offerItems$: Observable<any[]> = this.query.selectAll();
  bidItems$: Observable<any[]> = this.bidItemsQuery.selectAll();
  transportOffer$: Observable<any[]> = this.transportOfferQuery.selectAll();
  transportOffer: TransportOffer;
  transportBidId: number;
  bidItems: TransportBidItem[];

  id: number;

  constructor(private dialog: MatDialog,
    private service: OfferItemsService,
    private query: OfferItemsQuery,
    private bidItemsService: TransportBidItemService,
    private bidItemsQuery: TransportBidItemQuery,
    private transportOfferService: TransportOffersService,
    private transportOfferQuery: TransportOffersQuery,
    private route: ActivatedRoute) {

    this.route.params.subscribe((data: any) => {
      this.id = data.id;
    });
    this.offerItems$.pipe(
      tap((data) => {
        const length = data.length;
        for (let i = 0; i < length; i++) {
          var offer: any = {};

          offer.id = data[0].id;
          offer.price = data[0].price;
          offer.winner = data[0].winner;
          offer.rank = data[0].rank;
          offer.transport_offer_id = data[0].transport_offer_id;
          offer.transport_bid_item_id = data[0].transport_bid_item.id;

          data.splice(0, 1);
          if (offer.transport_offer_id == this.id) {
            data.push(offer);
          }
        }
      })).subscribe((data) => {
        this.offerItems = data;
      });

    this.transportOffer$.pipe(
      tap((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == this.id) {
            this.transportOffer = data[i];
            this.transportBidId = data[i].transport_bid.id;
            break;
          }
        }
      })
    ).subscribe(() => {
      this.bidItems$.pipe(
        tap((data) => {
          const length = data.length;
          for (let i = 0; i < data.length; i++) {
            if (this.transportBidId != data[i].transport_bid.id) {
              data.splice(i, 1);
              i = i - 1;
            }
          }
          this.bidItems = data;

        })).subscribe();
    });
  }

  ngOnInit(): void {
    this.service.get().subscribe();
    this.bidItemsService.get().subscribe();
    this.transportOfferService.get().subscribe();
  }

  onEdit(event: any): void {

    const dialogRef = this.dialog.open(TransportOfferItemFormComponent, {
      disableClose: true,
      data: {
        values: event.item,
        bidItems: this.bidItems
      }
    });

    (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
      this.service.update(data.id, data).subscribe();
      dialogRef.close();
    });

    (dialogRef.componentInstance as any).formCancel.subscribe(() => {
      dialogRef.close();
    });
  }

  onAdd(event: any): void {
    const dialogRef = this.dialog.open(TransportOfferItemFormComponent, {
      disableClose: true,
      data: {
        values: EMPTY_OFFER_ITEM,
        bidItems: this.bidItems
      }
    });

    (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
      data.rank = 0;
      data.transport_offer_id = this.id;
      this.service.add(data).subscribe();
      dialogRef.close();
    });

    (dialogRef.componentInstance as any).formCancel.subscribe(() => {
      dialogRef.close();
    });
  }


}
