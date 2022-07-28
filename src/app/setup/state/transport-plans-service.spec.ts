import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { TransportPlansService } from './transport-plans.service';
import { TransportPlan } from '../models/transport-plan.model';


describe('TransportPlansService', () => {
  let service: TransportPlansService;

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
    service = TestBed.inject(TransportPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetchTransport Plan from server', () => {
    const response = { success: true, data: [{}] };
    const spy = spyOn(service, 'get').and.returnValue(of(response));

    service.get().subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should add a new Transport Plan', () => {
    const response = { success: true, data: {} };
    const data: TransportPlan =
     { id: 1, reference_no:"2355363", plan_type:"test" , region_id:1 };
    const spy = spyOn(service, 'add').and.returnValue(of(response));


    service.add(data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data);
    });
  });

  it('should update a Transport Plan', () => {
    const response = { success: true, data: [{}] };
    const data: TransportPlan = { id: 1 } as TransportPlan;
    const spy = spyOn(service, 'update').and.returnValue(of(response));


    service.update(data.id, data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data.id, data);
    });
  });
});
