/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

describe('Service: Layout', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutService]
    });
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update isLoading when calling set method', () => {
    service.isLoading.set(true);
    expect(service.isLoading()).toBe(true);
    service.isLoading.set(false);
    expect(service.isLoading()).toBe(false);
  });
});
