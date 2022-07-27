import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Transporter } from 'src/app/setup/models/transporter.model';
import { TransportersQuery } from 'src/app/setup/state/transporters.query';
import { TransportersService } from 'src/app/setup/state/transporters.service';

@Component({
  selector: 'app-transport-offer-form',
  templateUrl: './transport-offer-form.component.html',
  styleUrls: ['./transport-offer-form.component.scss']
})
export class TransportOfferFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  @Output() formCancel = new EventEmitter();

  form: FormGroup;

  transport_bids: any[];
  transporters: any;
  bidId: number = null;
  transporterCode: number = null;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    data.transporters$.subscribe((data: any) => {
      this.transporters = data;
      data.forEach((element: any) => {
        if(element.code === this.data.values.transporter_code){
          this.transporterCode = element.id;
        }
      });
    });
    data.transportBids$.subscribe((data: any) => {
      this.transport_bids = data;
      data.forEach((element: any) => {
        if(element.reference_no === this.data.values.transport_bid_reference_no){
          this.bidId = element.id;
        }
      });
    });

    this.form = this.fb.group({
      id: data.values.id,
      transport_bid_id: [this.bidId, [Validators.required]],
      transporter_id: [this.transporterCode, [Validators.required]],
      offer_date: [data.values.offer_date, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      const payload = this.form.value;
      this.formSubmit.emit(payload);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  getErrorMessage(formControl: string): string | void {
    if (this.form.get(formControl).hasError('required')) {
      return 'this field is required';
    }
  }

}
