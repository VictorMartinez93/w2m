/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseService } from './base.service';

describe('Servuce: Base', () => {
  let service: BaseService<unknown>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseService]
    });

    service = TestBed.inject(BaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all entities', () => {
    const mockData = [{ id: 1, name: 'Entity 1' }, { id: 2, name: 'Entity 2' }];
    const expectedUrl = 'api/entities';
    (service as any).endpoint = 'api/entities';

    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get entity by id', () => {
    const mockEntity = { id: 1, name: 'Entity 1' };
    const expectedUrl = 'api/entities/1';
    (service as any).endpoint = 'api/entities';

    service.getById(1).subscribe(entity => {
      expect(entity).toEqual(mockEntity);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockEntity);
  });

  it('should create entity', () => {
    const mockEntity = { id: 1, name: 'Entity 1' };
    const expectedUrl = 'api/entities';
    (service as any).endpoint = 'api/entities';

    service.create(mockEntity).subscribe(entity => {
      expect(entity).toEqual(mockEntity);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockEntity);
  });

  it('should update entity', () => {
    const mockEntity = { id: 1, name: 'Updated Entity' };
    const expectedUrl = 'api/entities';
    (service as any).endpoint = 'api/entities';

    service.update(mockEntity).subscribe(entity => {
      expect(entity).toEqual(mockEntity);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT');
    req.flush(mockEntity);
  });

  it('should delete entity by id', () => {
    const expectedUrl = 'api/entities/1';
    (service as any).endpoint = 'api/entities';

    service.delete(1).subscribe(result => {
      expect(result).toBe(true);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });
});
