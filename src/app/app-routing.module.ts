import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportOfferItemComponent } from './setup/components/container/transport-offer-item/transport-offer-item.component';
import { TransportOfferComponent } from './setup/components/container/transport-offer/transport-offer.component';
import { TransporterComponent } from './setup/components/container/transporter/transporter.component';
import { TransportBidItemComponent } from './setup/components/container/transport-bid-item/transport-bid-item.component';
import { TransportBidComponent } from './setup/components/container/transport-bid/transport-bid.component';

const routes: Routes = [
  {path: 'transporters', component: TransporterComponent},
  {path: 'transport_offers', component: TransportOfferComponent},
  {path: 'transport_offers/:id', component: TransportOfferItemComponent},
  {path: 'transport_bid', component:TransportBidComponent},
  {path: 'transport_bid_item/:id',component:TransportBidItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
