import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from '../../interfaces/filters/filter';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  protected endpoint!: string;

  constructor(
    protected http: HttpClient
  ) { }

  public getAll(filters?: Filter[]): Observable<T[]> {
    const queryParams: string = this.getFilters(filters);
    return this.http.get<T[]>(`${this.endpoint}${queryParams}`);
  }

  public getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  public create(object: T): Observable<T> {
    return this.http.post<T>(this.endpoint, object);
  }

  public update(object: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}`, object);
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.endpoint}/${id}`);
  }

  protected getFilters(filters?: Filter[]): string {
    let queryParams: string = '';

    filters?.forEach((filter: Filter) =>
      queryParams += `${this.getConcatenation(queryParams)}${filter.field}=${filter.value}`);

    return queryParams;
  }

  protected getConcatenation(text: string): string {
    return text === '' ? '?' : '&';
  }
}
