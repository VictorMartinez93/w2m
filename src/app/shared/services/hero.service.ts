import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { Hero } from '../interfaces/heroes/hero';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, delay, tap } from 'rxjs';
import { Filter } from '../interfaces/filters/filter';

@Injectable({
  providedIn: 'root'
})
export class HeroService extends BaseService<Hero> {

  constructor(
    protected override http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {
    // super(http, `${environment.api.root}${environment.api.heroes}`);
    super(http);
    this.endpoint = `${environment.api.root}${environment.api.heroes}`;
  }

  public override getAll(filters?: Filter[]): Observable<Hero[]> {
    const queryParams: string = this.getFilters(filters);
    return this.http.get<Hero[]>(`${this.endpoint}${queryParams}`)
      .pipe(
        // Simulate delay of API.
        delay(750)
      );
  }

  public override getById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.endpoint}/${id}`)
      .pipe(
        // Simulate delay of API.
        delay(750)
      );
  }

  public override create(object: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.endpoint, object)
      .pipe(
        // Simulate delay of API.
        delay(750),
        tap(() => this.snackBar.open('Se ha creado correctamente', undefined, { duration: 2000 }))
      );
  }

  public override update(object: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.endpoint}/${object.id}`, object)
      .pipe(
        // Simulate delay of API.
        delay(750),
        tap(() => this.snackBar.open('Se ha editado correctamente', undefined, { duration: 2000 }))
      );
  }

  public override delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.endpoint}/${id}`)
      .pipe(
        // Simulate delay of API.
        delay(750),
        tap(() => this.snackBar.open('Se ha eliminado correctamente', undefined, { duration: 2000 }))
      );
  }

}
