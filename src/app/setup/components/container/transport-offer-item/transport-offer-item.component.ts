import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, tap } from 'rxjs';
import { EMPTY_OFFER_ITEM, OfferItem } from 'src/app/setup/models/offer-item.model';
import { OfferItemsQuery } from 'src/app/setup/state/offer-items.query';
import { OfferItemsService } from 'src/app/setup/state/offer-items.service';
import { Column } from 'src/app/shared/models/column.model';
import { TransportOfferItemFormComponent } from '../../ui/transport-offer-item-form/transport-offer-item-form.component';
import { ActivatedRoute, Router } from '@angular/router';
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
    { name: 'price', label: 'Price' },
  ];

  offerItems$: Observable<any[]> = this.query.selectAll({
        filterBy: [(entity: any) => entity.transport_offer_id == this.router.url.slice(this.router.url.lastIndexOf('/')+1)]
      });
  bidItems$: Observable<any[]>;

  transportOffer$: Observable<any[]> = this.transportOfferQuery.selectAll({
    filterBy: [(entity: any) => entity.id == this.router.url.slice(this.router.url.lastIndexOf('/')+1)]
  });

  transportBidRef: string;

  id: number;

  constructor(private dialog: MatDialog,
    private service: OfferItemsService,
    private query: OfferItemsQuery,
    private bidItemsService: TransportBidItemService,
    private bidItemsQuery: TransportBidItemQuery,
    private transportOfferService: TransportOffersService,
    private transportOfferQuery: TransportOffersQuery,
    private route: ActivatedRoute,
    private router: Router) {

    this.route.params.subscribe((data: any) => {
      this.id = data.id;
    });

    this.transportOffer$.subscribe((data: any)=>{
      this.transportBidRef = data[0].transport_bid_reference_no;

      this.bidItems$ = this.bidItemsQuery.selectAll({
        filterBy: [(entity: any) => entity.transport_bid_reference_no == this.transportBidRef]
      });

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
        bidItems$: this.bidItems$
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
        bidItems$: this.bidItems$
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
