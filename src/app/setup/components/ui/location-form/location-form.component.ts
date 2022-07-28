import { Component, EventEmitter, Inject,Input,OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  
 
  @Output() formSubmit = new EventEmitter();
  
  locations$;
  selected;
 

  form: FormGroup;

  locationDropDown:string[]= [
    'Region','Zone','Wereda','Warehouse','Hub','FDP'
  ];
  
  
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {formData:any, lookupData:any },
    public dialogRef: MatDialogRef<LocationFormComponent>) {

    this.locations$ = this.data.lookupData.locations$;
    this.selected = this.data.lookupData.selectedItem;
 
    this.form = this.fb.group({
      id: [data.formData.id],
      code: data.formData.code,
      name: [data.formData.name,[Validators.required],],
      location_type: data.formData.location_type,
      ancestry:parseInt(data.formData.ancestry),
      description: data.formData.description
    });
      }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    const payload = this.form.value;
    this.formSubmit.emit(payload);
  }
}

