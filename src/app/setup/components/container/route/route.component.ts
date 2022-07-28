import { Component, OnInit } from '@angular/core';
import { filter, map, observable, Observable } from 'rxjs';
import { EMPTY_ROUTE, Route } from 'src/app/setup/models/route.model';
import { Column } from 'src/app/shared/models/column.model';
import { RoutesQuery } from 'src/app/setup/state/routes.query';
import { RoutesService } from 'src/app/setup/state/routes.service';
import { MatDialog } from '@angular/material/dialog';
import { RouteFormComponent } from '../../ui/route-form/route-form.component';
import { LocationsService } from 'src/app/setup/state/locations.service';
import { LocationsQuery } from 'src/app/setup/state/locations.query';
import { Location } from 'src/app/setup/models/location.model';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  actions: any[] = [
    { color: 'success', label: 'New', disabled: false, icon: 'add_circle' }
  ];

  tableActions: any[] = [
    { icon: 'edit', color: 'warn', tooltip: 'Edit'}
  ]
  
  columns: Column[] = [
    { name: 'name', label: 'Name'},
    { name: 'region_id', label: 'Region'},
    { name: 'source_id', label: 'Source'},
    { name: 'destination', label: 'Destination'},
  ];

  
  routes: Route[] = [];

  
  routes$: Observable<Route[]> = this.query.selectAll();
  locations$:Observable<Location[]> = this.locationQuery.selectAll();
  locationRegions$:Observable<Location[]> =this.locationQuery.selectAll(
    {
      filterBy: Location => Location.location_type == "Region"
    }
  );
  
  
  constructor(private dialog: MatDialog,
    private service:RoutesService,
    private query: RoutesQuery,
    private locationService:LocationsService,
    private locationQuery:LocationsQuery) { 
     
      this.service.get().subscribe();
      this.locationService.get().subscribe();
    
    }

  ngOnInit(): void {
  }

  onAdd(event: any): void {
    const dialogRef = this.dialog.open(RouteFormComponent, {
     disableClose: true,
     data: {
      formData: EMPTY_ROUTE,
      lookupData:{
         locations$: this.locations$,
         locationRegions$: this.locationRegions$,
      },
      
    }
    });
    
    (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
      this.service.add(data).subscribe();
       dialogRef.close();
    });
   }

   onEdit(event: any): void {
    const dialogRef = this.dialog.open(RouteFormComponent, {
      disableClose: true,
      data: {
        formData: event.item,
        lookupData:{
           locations$: this.locations$,
        },
      }
     });
     
     (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
        this.service.update(data.id, data).subscribe();
        dialogRef.close();
     });
  }

  // getRegions():void{
  //   this.locationRegions$.pipe(
  //     map((this.locationRegions$.))
  //   )
  // }
}
