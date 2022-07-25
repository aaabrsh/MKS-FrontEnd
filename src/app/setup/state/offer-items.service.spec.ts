import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { OfferItemsService } from './offer-items.service';
import { OfferItem } from '../models/offer-item.model';

describe('OfferItemsService', () => {
  let service: OfferItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        MessageService,
      ]
    });
    service = TestBed.inject(OfferItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transport offer from server', () => {
    const response = { success: true, data: [{}] };
    const spy = spyOn(service, 'get').and.returnValue(of(response));

    service.get().subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should add a new transport offer', () => {
    const response = { success: true, data: {} };
    const data: OfferItem =
     { id: null, transport_offer_id: null, transport_bid_item_id: null, price: 100, winner: false, rank: 5};
    const spy = spyOn(service, 'add').and.returnValue(of(response));


    service.add(data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data);
    });
  });

  it('should update a transport offer', () => {
    const response = { success: true, data: [{}] };
    const data: OfferItem = { id: 1 } as OfferItem;
    const spy = spyOn(service, 'update').and.returnValue(of(response));


    service.update(data.id, data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data.id, data);
    });
  });
});
