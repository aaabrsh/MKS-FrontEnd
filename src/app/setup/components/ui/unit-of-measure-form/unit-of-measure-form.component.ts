import { Component,EventEmitter, Inject, OnInit, Output  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-unit-of-measure-form',
  templateUrl: './unit-of-measure-form.component.html',
  styleUrls: ['./unit-of-measure-form.component.scss']
})
export class UnitOfMeasureFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<UnitOfMeasureFormComponent>) { 
      this.form = this.fb.group({
        id: data.id,
        name: data.name,
        abbreviation:data.abbreviation,
        unit_type: data.unit_type,
        
      });
    }

  ngOnInit(): void {
  
  }

  onSubmit(): void {
    const payload = this.form.value;
    this.formSubmit.emit(payload);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
