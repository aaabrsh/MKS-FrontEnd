import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { TransporterComponent } from './components/container/transporter/transporter.component';
import { SharedModule } from '../shared/shared.module';
import { TransporterFormComponent } from './components/ui/transporter-form/transporter-form.component';
import { AppCommonModule } from '../app.common.module';
import { TransportOfferComponent } from './components/container/transport-offer/transport-offer.component';
import { TransportOfferFormComponent } from './components/ui/transport-offer-form/transport-offer-form.component';
import { TransportOfferItemComponent } from './components/container/transport-offer-item/transport-offer-item.component';
import { TransportOfferItemFormComponent } from './components/ui/transport-offer-item-form/transport-offer-item-form.component';
import { TransportBidComponent } from './components/container/transport-bid/transport-bid.component';
import { TransportBidItemComponent } from './components/container/transport-bid-item/transport-bid-item.component';
import { TransportBidFormComponent } from './components/ui/transport-bid-form/transport-bid-form.component';
import { TransportBidItemFormComponent } from './components/ui/transport-bid-item-form/transport-bid-item-form.component';
import { LocationComponent } from './components/container/location/location.component';
import { RouteComponent } from './components/container/route/route.component';
import { TransportPlanComponent } from './components/container/transport-plan/transport-plan.component';
import { TransportPlanItemComponent } from './components/container/transport-plan-item/transport-plan-item.component';
import { UnitOfMeasureComponent } from './components/container/unit-of-measure/unit-of-measure.component';
import { TransportPlanFormComponent } from './components/ui/transport-plan-form/transport-plan-form.component';
import { UnitOfMeasureFormComponent } from './components/ui/unit-of-measure-form/unit-of-measure-form.component';
import { LocationFormComponent } from './components/ui/location-form/location-form.component';
import { RouteFormComponent } from './components/ui/route-form/route-form.component';
import { TransportPlanItemFormComponent } from './components/ui/transport-plan-item-form/transport-plan-item-form.component';


@NgModule({
  declarations: [
    TransporterComponent,
    TransporterFormComponent,
    TransportOfferComponent,
    TransportOfferFormComponent,
    TransportOfferItemComponent,
    TransportOfferItemFormComponent,
    TransportBidComponent,
    TransportBidItemComponent,
    TransportBidFormComponent,
    TransportBidItemFormComponent,
    LocationComponent,
    RouteComponent,
    TransportPlanComponent,
    TransportPlanItemComponent,
    UnitOfMeasureComponent,
    TransportPlanFormComponent,
    UnitOfMeasureFormComponent,
    LocationFormComponent,
    RouteFormComponent,
    TransportPlanItemFormComponent,

  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    SharedModule,
    AppCommonModule
  ],
  exports: [
    TransporterComponent
  ]
})
export class SetupModule { }
