import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RoutesStore, RoutesState } from './routes.store';

@Injectable({ providedIn: 'root' })
export class RoutesQuery extends QueryEntity<RoutesState> {

  constructor(protected override store: RoutesStore) {
    super(store);
  }


}
