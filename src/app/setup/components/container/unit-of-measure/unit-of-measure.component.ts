import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UnitOfMeasure } from 'src/app/setup/models/unit-of-measure.model';
import { UnitOfMeasuresQuery } from 'src/app/setup/state/unit-of-measures.query';
import { UnitOfMeasuresService } from 'src/app/setup/state/unit-of-measures.service';
import { Column } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-unit-of-measure',
  templateUrl: './unit-of-measure.component.html',
  styleUrls: ['./unit-of-measure.component.scss']
})
export class UnitOfMeasureComponent implements OnInit {


  actions: any[] = [
    { color: 'success', label: 'New', disabled: false, icon: 'add_circle' }
  ];

  tableActions: any[] = [
    { icon: 'edit', color: 'warn', tooltip: 'Edit'}
  ]

  columns: Column[] = [
    { name: 'reference_no', label: 'Reference_no'},
    { name: 'plan_type', label: 'Plan_type'},
    { name: 'region_id', label: 'Region_id'},
  ];
  
  unitOfMeasure: UnitOfMeasure[] = [];

  unitOfMeasures$: Observable<UnitOfMeasure[]> = this.query.selectAll();
  
  constructor(private dialog: MatDialog,
  private service:UnitOfMeasuresService,
  private query: UnitOfMeasuresQuery) { }

  ngOnInit(): void {
  }

}
