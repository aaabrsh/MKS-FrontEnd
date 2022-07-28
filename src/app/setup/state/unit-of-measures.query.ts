import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UnitOfMeasuresStore, UnitOfMeasuresState } from './unit-of-measures.store';

@Injectable({ providedIn: 'root' })
export class UnitOfMeasuresQuery extends QueryEntity<UnitOfMeasuresState> {

  constructor(protected override store: UnitOfMeasuresStore) {
    super(store);
  }

}
