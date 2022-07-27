import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { EMPTY_TRANSPORT_OFFER, TransportOffer } from 'src/app/setup/models/transport-offer.model';
import { Transporter } from 'src/app/setup/models/transporter.model';
import { TransportBid } from 'src/app/setup/models/transport_bid.model';
import { TransportBidQuery } from 'src/app/setup/state/state/transport-bid.query';
import { TransportBidService } from 'src/app/setup/state/state/transport-bid.service';
import { TransportOffersQuery } from 'src/app/setup/state/transport-offers.query';
import { TransportOffersService } from 'src/app/setup/state/transport-offers.service';
import { TransportersQuery } from 'src/app/setup/state/transporters.query';
import { TransportersService } from 'src/app/setup/state/transporters.service';
import { Column } from 'src/app/shared/models/column.model';
import { TransportOfferFormComponent } from '../../ui/transport-offer-form/transport-offer-form.component';

@Component({
  selector: 'app-transport-offer',
  templateUrl: './transport-offer.component.html',
  styleUrls: ['./transport-offer.component.scss']
})
export class TransportOfferComponent implements OnInit {

  actions: any[] = [
    { color: 'success', label: 'New', disabled: false, icon: 'add_circle' }
  ];

  tableActions: any[] = [
    { icon: 'edit', color: 'warn', tooltip: 'Edit' },
    { icon: 'description', color: 'primary', tooltip: 'Offer Items' }
  ]

  columns: Column[] = [
    { name: 'transport_bid_ref', label: 'Transport Bid' },
    { name: 'transport_code_and_name', label: 'Transporter' },
    { name: 'offer_date', label: 'Offer Date' }
  ];

  transportOffers: TransportOffer[] = [];
  transportOffers$: Observable<any[]> = this.query.selectAll();
  transporters$: Observable<Transporter[]> = this.transportersQuery.selectAll();
  transportBids$: Observable<TransportBid[]> = this.transportBidQuery.selectAll();

  constructor(private dialog: MatDialog,
    private service: TransportOffersService,
    private query: TransportOffersQuery,
    private transportersQuery: TransportersQuery,
    private transportersService: TransportersService,
    private transportBidService: TransportBidService,
    private transportBidQuery: TransportBidQuery,
    private router: Router,
    private route: ActivatedRoute) {

    // this.transportOffers$.pipe(
    //   tap((data) => {
    //     const length = data.length;
    //     for (let i = 0; i < length; i++) {
    //       var offer: any = {};

    //       offer.id = data[0].id;
    //       offer.offer_date = data[0].offer_date;
    //       offer.transport_bid_id = data[0].transport_bid.id;
    //       offer.transport_bid_ref = data[0].transport_bid.reference_no;
    //       offer.transporter_id = data[0].transporter.id;
    //       offer.transporter_code = data[0].transporter.code;
    //       offer.transporter_name = data[0].transporter.name;
    //       offer.transport_code_and_name = `${offer.transporter_code}: ${offer.transporter_name}`;

    //       data.splice(0, 1);
    //       data.push(offer);
    //     }
    //   })).subscribe((data) => {
    //     this.transportOffers = data;
    //   });

  }

  ngOnInit(): void {

    this.service.get().subscribe();
    this.transportersService.get().subscribe();
    this.transportBidService.get().subscribe();
    console.log(this.transportOffers$)
  }

  onClick(event: any): void {
    if (event.type === "edit")
      this.onEdit(event);
    if (event.type === "description")
      this.onDescription(event);
  }

  onEdit(event: any): void {

    const dialogRef = this.dialog.open(TransportOfferFormComponent, {
      disableClose: true,
      data: { 
        values: event.item,
        transporters$: this.transporters$,
        transportBids$: this.transportBids$
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

    const dialogRef = this.dialog.open(TransportOfferFormComponent, {
      disableClose: true,
      data: {
        values: EMPTY_TRANSPORT_OFFER,
        transporters$: this.transporters$,
        transportBids$: this.transportBids$
      }
    });

    (dialogRef.componentInstance as any).formSubmit.subscribe((data: TransportOffer) => {
      this.service.add(data).subscribe();
      dialogRef.close();
    });

    (dialogRef.componentInstance as any).formCancel.subscribe(() => {
      dialogRef.close();
    });
  }

  onDescription(event: any): void {
    this.router.navigate([`/transport_offers/${event.item.id}`], { relativeTo: this.route })
  }


}
