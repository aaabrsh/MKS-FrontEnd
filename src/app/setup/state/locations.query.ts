import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LocationsStore, LocationsState } from './locations.store';

@Injectable({ providedIn: 'root' })
export class LocationsQuery extends QueryEntity<LocationsState> {

  constructor(protected override store: LocationsStore) {
    super(store);
  }

}
