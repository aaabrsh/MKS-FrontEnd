import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TransportPlanItem } from '../models/transport-plan-item.model';

export interface TransportPlanItemsState extends EntityState<TransportPlanItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'transport-plan-items' })
export class TransportPlanItemsStore extends EntityStore<TransportPlanItemsState> {

  constructor() {
    super();
  }

}
