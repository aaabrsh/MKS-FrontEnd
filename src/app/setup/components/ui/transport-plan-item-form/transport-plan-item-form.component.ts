import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transport-plan-item-form',
  templateUrl: './transport-plan-item-form.component.html',
  styleUrls: ['./transport-plan-item-form.component.scss']
})
export class TransportPlanItemFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  form: FormGroup;
  locations$;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TransportPlanItemFormComponent>) { 
      
      this.locations$ = this.data.lookupData.locations$; 

      this.form = this.fb.group({
        id: data.formData.id,
        route_id: data.formData.route_id,
        transport_plan_id: data.formData.transport_plan_id,
        quantity: data.formData.quantity,
        unit_id: data.formData.unit_id,
        planned:data.formData.planned,
      });
    }

  ngOnInit(): void {
      
 
  }

  onSubmit():void {
    const payload = this.form.value;
    this.formSubmit.emit(payload);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
