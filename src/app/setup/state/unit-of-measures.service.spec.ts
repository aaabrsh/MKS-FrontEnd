import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { UnitOfMeasuresService } from './unit-of-measures.service';
import { UnitOfMeasure } from '../models/unit-of-measure.model';


describe('UnitOfMeasuresService', () => {
  let service: UnitOfMeasuresService;

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
    service = TestBed.inject(UnitOfMeasuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Unit of Measures from server', () => {
    const response = { success: true, data: [{}] };
    const spy = spyOn(service, 'get').and.returnValue(of(response));

    service.get().subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should add a new Unit of Measures', () => {
    const response = { success: true, data: {} };
    const data: UnitOfMeasure =
     { id: 1, name: 'test' , abbreviation: 'tn', unit_type:'test' };
    const spy = spyOn(service, 'add').and.returnValue(of(response));


    service.add(data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data);
    });
  });

  it('should update  Unit of Measures', () => {
    const response = { success: true, data: [{}] };
    const data: UnitOfMeasure = { id: 1 } as UnitOfMeasure;
    const spy = spyOn(service, 'update').and.returnValue(of(response));


    service.update(data.id, data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data.id, data);
    });
  });
});
