import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import  {FormBuilder, FormGroup} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transport-plan-form',
  templateUrl: './transport-plan-form.component.html',
  styleUrls: ['./transport-plan-form.component.scss']
})
export class TransportPlanFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  form: FormGroup;
  locations$;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TransportPlanFormComponent>) { 
      
      this.locations$ = this.data.lookupData.locations$; 

      this.form = this.fb.group({
        id: data.formData.id,
        reference_no: data.formData.reference_no,
        plan_type: data.formData.plan_type,
        region_id: data.formData.region_id,
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
