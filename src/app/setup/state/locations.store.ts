import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Location } from '../models/location.model';

export interface LocationsState extends EntityState<Location> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'locations' })
export class LocationsStore extends EntityStore<LocationsState> {

  constructor() {
    super();
  }

}
