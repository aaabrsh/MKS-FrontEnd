import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransportPlansQuery } from 'src/app/setup/state/transport-plans.query';
import { TransportPlansService } from 'src/app/setup/state/transport-plans.service';
import { Column } from 'src/app/shared/models/column.model';
import { EMPTY_TRANSPORT_PLAN, TransportPlan } from 'src/app/setup/models/transport-plan.model';
import { Observable } from 'rxjs';
import { TransportPlanFormComponent } from '../../ui/transport-plan-form/transport-plan-form.component';
import { LocationsQuery } from 'src/app/setup/state/locations.query';
import { LocationsService } from 'src/app/setup/state/locations.service';
import { Location } from 'src/app/setup/models/location.model';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-transport-plan',
  templateUrl: './transport-plan.component.html',
  styleUrls: ['./transport-plan.component.scss']
})
export class TransportPlanComponent implements OnInit {

  actions: any[] = [
    { color: 'success', label: 'New', disabled: false, icon: 'add_circle' }
  ];

  tableActions: any[] = [
    { icon: 'edit', color: 'warn', tooltip: 'Edit'},
    { icon: 'description', color: 'primary', tooltip: 'Details'},
  ]

  columns: Column[] = [
    { name: 'reference_no', label: 'Reference_no'},
    { name: 'plan_type', label: 'Plan_type'},
    { name: 'region_name', label: 'Region'},
  ];
  
  transportPlan: TransportPlan[] = [];


  transportPlans$: Observable<TransportPlan[]> = this.query.selectAll();

  locations$: Observable<Location[]> = this.locationQuery.selectAll();

  constructor(private dialog: MatDialog,
    private service:TransportPlansService,
    private query: TransportPlansQuery,
    private locationQuery: LocationsQuery,
    private locationService: LocationsService,
    private router: Router,
    private route: ActivatedRoute) {
   
      this.service.get().subscribe();
      this.locationService.get().subscribe();    

     }

  ngOnInit(): void {
  }

  onClick(event:any): void {
      if(event.type === "edit")
      {
        this.onEdit(event);
      }
      else{
        this.onDetail(event);
      }
  }


  onAdd(event: any): void {
    const dialogRef = this.dialog.open(TransportPlanFormComponent, {
     disableClose: true,
     data: {
      formData: EMPTY_TRANSPORT_PLAN,
      lookupData : {
         locations$: this.locations$,
      }
     }
    });
    
    (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
       this.service.add(data).subscribe();
       dialogRef.close();
    });
   }

   onEdit(event: any): void {
    const dialogRef = this.dialog.open(TransportPlanFormComponent, {
      disableClose: true,
      data:{
        formData: event.item,
        lookupData : {
           locations$: this.locations$,
        }
      }
     });
     
     (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
        this.service.update(data.id, data).subscribe();
        dialogRef.close();
     });
  }

  onDetail(event:any): void {
    this.router.navigate([`/transport_plan_items/${event.item.id}`], {relativeTo: this.route})
    
  }

}
