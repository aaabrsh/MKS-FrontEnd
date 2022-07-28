import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { LocationsService } from './locations.service';
import { Location } from '../models/location.model';

describe('LocationsService', () => {
  let service: LocationsService;
 

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
    service = TestBed.inject(LocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch location from server', () => {
    const response = { success: true, data: [{}] };
    const spy = spyOn(service, 'get').and.returnValue(of(response));

    service.get().subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should add a new location', () => {
    const response = { success: true, data: {} };
    const data: Location =
     { id: 2, code: 'Test', name: 'Addis Ababa',location_type:'Region',description:'test',
     ancestry: null  };
    const spy = spyOn(service, 'add').and.returnValue(of(response));


    service.add(data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data);
    });
  });

  it('should update a Location', () => {
    const response = { success: true, data: [{}] };
    const data: Location = { id: 1 } as Location;
    const spy = spyOn(service, 'update').and.returnValue(of(response));


    service.update(data.id, data).subscribe((res: any) => {
      expect(res).toEqual(response);
      expect(spy).toHaveBeenCalledWith(data.id, data);
    });
  });
});
