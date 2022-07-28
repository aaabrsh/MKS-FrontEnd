import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EMPTY_TRANSPORT_PLAN_ITEM, TransportPlanItem } from 'src/app/setup/models/transport-plan-item.model';
import { LocationsQuery } from 'src/app/setup/state/locations.query';
import { LocationsService } from 'src/app/setup/state/locations.service';
import { TransportPlanItemsQuery } from 'src/app/setup/state/transport-plan-items.query';
import { TransportPlanItemsService } from 'src/app/setup/state/transport-plan-items.service';
import { Column } from 'src/app/shared/models/column.model';
import { Location } from 'src/app/setup/models/location.model';
import { TransportPlanItemFormComponent } from '../../ui/transport-plan-item-form/transport-plan-item-form.component';

@Component({
  selector: 'app-transport-plan-item',
  templateUrl: './transport-plan-item.component.html',
  styleUrls: ['./transport-plan-item.component.scss']
})
export class TransportPlanItemComponent implements OnInit {

  actions: any[] = [
    { color: 'success', label: 'New', disabled: false, icon: 'add_circle' }
  ];

  tableActions: any[] = [
    { icon: 'edit', color: 'warn', tooltip: 'Edit'}
  ]

  columns: Column[] = [
    { name: 'route_id', label: 'Route'},
    { name: 'transport_plan_id', label: 'Transport Plan'},
    { name: 'quantity', label: 'Quantity'},
    { name: 'unit_id', label: 'Unit'},
  ];

  transportPlanItems: TransportPlanItem[] = [];
 

  transportPlanItems$: Observable<TransportPlanItem[]> = this.query.selectAll();
  location$:Observable<Location[]> = this.locationQuery.selectAll();
  
  constructor(private dialog: MatDialog,
    private service:TransportPlanItemsService,
    private query: TransportPlanItemsQuery,
    private locationService: LocationsService,
    private locationQuery:LocationsQuery) { }

  ngOnInit(): void {
   this.service.get().subscribe();
   this.locationService.get().subscribe();
  }

  onAdd(event: any): void {
    const dialogRef = this.dialog.open(TransportPlanItemFormComponent, {
     disableClose: true,
     data: {
      formData:EMPTY_TRANSPORT_PLAN_ITEM,
      lookupData: {
        location : this.location$,
      }
     }
    });
    
    (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
       this.service.add(data).subscribe();
       dialogRef.close();
    });
   }
  
  onEdit(event: any): void {
    const dialogRef = this.dialog.open(TransportPlanItemFormComponent, {
      disableClose: true,
      data: event.item
     });
     
     (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
        this.service.update(data.id, data).subscribe();
        dialogRef.close();
     });
  }



}

