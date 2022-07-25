import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DummyDataService } from 'src/app/setup/state/dummies/dummy-data.service';

@Component({
  selector: 'app-transport-offer-item-form',
  templateUrl: './transport-offer-item-form.component.html',
  styleUrls: ['./transport-offer-item-form.component.scss']
})
export class TransportOfferItemFormComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  @Output() formCancel = new EventEmitter();

  form: FormGroup;

  bid_items: any[];

  constructor(private fb: FormBuilder,
    private dummy: DummyDataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.bid_items = data.bidItems;

    this.form = this.fb.group({
      id: data.values.id,
      transport_bid_item_id: [data.values.transport_bid_item_id, [Validators.required]],
      price: [data.values.price, [Validators.required, Validators.min(0)]],
      winner: data.values.winner,
      rank: data.values.rank
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
    if (formControl === "transport_bid_item_id") {
      if (this.form.get('transport_bid_item_id').hasError('required')) {
        return 'this field is required';
      }
    } else if (formControl === "price") {
      if (this.form.get('price').hasError('required')) {
        return 'this field is required';
      }
      if (this.form.get('price').hasError('min')) {
        return 'minimum amount is 0';
      }
    }
  }

}