import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportOfferItemComponent } from './setup/components/container/transport-offer-item/transport-offer-item.component';
import { TransportOfferComponent } from './setup/components/container/transport-offer/transport-offer.component';
import { TransporterComponent } from './setup/components/container/transporter/transporter.component';
import { TransportBidItemComponent } from './setup/components/container/transport-bid-item/transport-bid-item.component';
import { TransportBidComponent } from './setup/components/container/transport-bid/transport-bid.component';
import { LocationComponent } from './setup/components/container/location/location.component';
import { RouteComponent } from './setup/components/container/route/route.component';
import { TransportPlanItemComponent } from './setup/components/container/transport-plan-item/transport-plan-item.component';
import { TransportPlanComponent } from './setup/components/container/transport-plan/transport-plan.component';
import { UnitOfMeasureComponent } from './setup/components/container/unit-of-measure/unit-of-measure.component';


const routes: Routes = [
  {path: 'transporters', component: TransporterComponent},
  {path: 'transport_offers', component: TransportOfferComponent},
  {path: 'transport_offers/:id', component: TransportOfferItemComponent},
  {path: 'transport_bid', component:TransportBidComponent},
  {path: 'transport_bid_item/:id',component:TransportBidItemComponent},
  {path: 'transporters', component: TransporterComponent},
  {path:'transport_plans', component:TransportPlanComponent},
  {path:'unit_of_measures', component:UnitOfMeasureComponent},
  {path:'locations', component: LocationComponent},
  {path:'routes', component:RouteComponent},
  {path:'transport_plan_items/:id', component: TransportPlanItemComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
