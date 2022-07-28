import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UnitOfMeasure } from '../models/unit-of-measure.model';

export interface UnitOfMeasuresState extends EntityState<UnitOfMeasure> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'unit-of-measures' })
export class UnitOfMeasuresStore extends EntityStore<UnitOfMeasuresState> {

  constructor() {
    super();
  }

}
