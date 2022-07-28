import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Column } from 'src/app/shared/models/column.model';
import { EMPTY_LOCATION, Location } from 'src/app/setup/models/location.model';
import { LocationsQuery } from 'src/app/setup/state/locations.query';
import { LocationsService } from 'src/app/setup/state/locations.service';
import { MatDialog } from '@angular/material/dialog';
import { LocationFormComponent } from '../../ui/location-form/location-form.component';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  actions: any[] = [
    { color: 'success', label: 'New', disabled: false, icon: 'add_circle' }
  ];

  // tableActions: any[] = [
  //   { icon: 'edit', color: 'warn', tooltip: 'Edit'}
  // ]

  columns: Column[] = [
    { name: 'code', label: 'Code' },
    { name: 'name', label: 'Name' },
    { name: 'location_type', label: 'Location Type' },
    { name: 'description', label: 'Description' }
  ];


  locations: TreeNode[] = [];
  loading: boolean = false;

  allLocations$: Observable<Location[]> = this.query.selectAll();




  constructor(private dialog: MatDialog,
    private service: LocationsService,
    private query: LocationsQuery,) {
  }

  ngOnInit(): void {
    this.service.get();
  }

  onLoad($event: any): void {
    this.service.getRegions().subscribe((data) => {
      this.locations = data;
    });
  }

  onExpand($event: any): void {
    this.loading = false;
    const node = $event.node;
    this.service.getChildren($event.node.data.id).subscribe((data) => {
      node.children = data;
    });
    // console.log(node)

    //   node.children = [
    //     {
    //         data: {  
    //             name: node.data.name + ' - 0',
    //             size: Math.floor(Math.random() * 1000) + 1 + 'kb',
    //             type: 'File'
    //         },
    //     },
    //     {
    //         data: {  
    //             name: node.data.name + ' - 1',
    //             size: Math.floor(Math.random() * 1000) + 1 + 'kb',
    //             type: 'File'
    //         }
    //     }
    // ];

    this.locations = [...this.locations];
    this.locations = [...this.locations];

  }

  onAdd(event: any): void {
    const dialogRef = this.dialog.open(LocationFormComponent, {
      disableClose: true,
      data: {
        formData: EMPTY_LOCATION,
        lookupData: {
          locations$: this.allLocations$
        }
      }
    });

    (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
      data.ancestry === "" ? data.ancestry = null : data.ancestry = data.ancestry;
      this.service.add(data).subscribe();
      dialogRef.close();
    });
  }

  onEdit(event: any): void {
    const dialogRef = this.dialog.open(LocationFormComponent, {
      disableClose: true,
      data: {
        formData: event.item,
        lookupData: {
          selectedItem: event.item.ancestry,
          locations$: this.allLocations$
        }
      }
    });

    (dialogRef.componentInstance as any).formSubmit.subscribe((data: any) => {
      data.ancestry === "" ? data.ancestry = null : data.ancestry = data.ancestry;
      this.service.update(data.id, data).subscribe();
      dialogRef.close();
    });
  }
}