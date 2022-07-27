import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl,FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  

  locations$;
  locationRegions$;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {formData:any, lookupData:any}) { 

      this.locations$ = this.data.lookupData.locations$;
      this.locationRegions$ =this.data.lookupData.locationRegions$;
      this.form = this.fb.group({
        id: [data.formData.id],
        name: [data.formData.name,[Validators.required]],
        region_id:[data.formData.region_id,[Validators.required]],
        source_id:data.formData.source_id,
        destination_id:[data.formData.destination_id],
      },{
        validators: this.controlMatchValidator,
      });
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const payload = this.form.value;
    this.formSubmit.emit(payload);
  }

   controlMatchValidator: ValidatorFn = (control: AbstractControl):
    ValidationErrors | null => {
    
    const source = control.get('source_id');
    const destination = control.get('destination_id');

   return source.value != destination.value ? { controlMatch: true } : null;
  };



}

