import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Route } from '../models/route.model';

export interface RoutesState extends EntityState<Route> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'routes' })
export class RoutesStore extends EntityStore<RoutesState> {

  constructor() {
    super();
  }

}
