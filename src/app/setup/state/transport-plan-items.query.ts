import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TransportPlanItemsStore, TransportPlanItemsState } from './transport-plan-items.store';

@Injectable({ providedIn: 'root' })
export class TransportPlanItemsQuery extends QueryEntity<TransportPlanItemsState> {

  constructor(protected override store: TransportPlanItemsStore) {
    super(store);
  }

}
