import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TransportPlansStore, TransportPlansState } from './transport-plans.store';

@Injectable({ providedIn: 'root' })
export class TransportPlansQuery extends QueryEntity<TransportPlansState> {

  constructor(protected override store: TransportPlansStore) {
    super(store);
  }

}
