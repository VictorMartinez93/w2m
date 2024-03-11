/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeroService } from './hero.service';
import { Hero } from '../interfaces/heroes/hero';
import { environment } from '../../../environments/environment';
import { EAlignment } from '../enums/e-alignment.enum';

describe('Service: Hero', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MatSnackBar, useValue: snackBarSpyObj }
      ]
    });

    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all heroes', () => {
    const mockHeroes: Hero[] = [{ id: 1, name: 'Hero 1', alignment: EAlignment.EVIL, powers: ['Intelligence'] }];

    service.getAll().subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(`${environment.api.root}${environment.api.heroes}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should get hero by id', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 1', alignment: EAlignment.EVIL, powers: ['Intelligence'] };

    service.getById(1).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${environment.api.root}${environment.api.heroes}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should create hero', () => {
    const mockHero: Hero = { id: 3, name: 'Hero 3', alignment: EAlignment.EVIL, powers: ['Intelligence'] };

    service.create(mockHero).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${environment.api.root}${environment.api.heroes}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockHero);
  });

  it('should update hero', () => {
    const mockHero: Hero = { id: 3, name: 'Hero 3 edited', alignment: EAlignment.GOOD, powers: ['Intelligence', 'Speed'] };

    service.update(mockHero).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${environment.api.root}${environment.api.heroes}/${mockHero.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockHero);
  });

  it('should delete hero', () => {
    const id: number = 3;
    service.delete(id).subscribe((deleted) => {
      expect(deleted).toEqual(true);
    });

    const req = httpMock.expectOne(`${environment.api.root}${environment.api.heroes}/${id}`);
    expect(req.request.method).toBe('DELETE');
  });
});
