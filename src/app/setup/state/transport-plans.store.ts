import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TransportPlan } from '../models/transport-plan.model';

export interface TransportPlansState extends EntityState<TransportPlan> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'transport-plans' })
export class TransportPlansStore extends EntityStore<TransportPlansState> {

  constructor() {
    super();
  }

}
