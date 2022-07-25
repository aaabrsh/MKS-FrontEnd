import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { TransportOffersService } from './transport-offers.service';
import { TransportOffer } from '../models/transport-offer.model';

describe('TransportOffersService', () => {
  let service: TransportOffersService;

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
    service = TestBed.inject(TransportOffersService);
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
    const data: TransportOffer =
     { id: null, transport_bid_id: null, transporter_id: null, offer_date: "0001-01-01"};
    const spy = spyOn(service, 'add').and.returnValue(of(response));


    service.add(data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data);
    });
  });

  it('should update a transport offer', () => {
    const response = { success: true, data: [{}] };
    const data: TransportOffer = { id: 1 } as TransportOffer;
    const spy = spyOn(service, 'update').and.returnValue(of(response));


    service.update(data.id, data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data.id, data);
    });
  });
});
