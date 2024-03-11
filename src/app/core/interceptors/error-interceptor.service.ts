import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(
    private readonly snackBar: MatSnackBar
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 404) {
          this.snackBar.open('No se ha encontrado el recurso...', undefined, { duration: 2000 });
        } else {
          this.snackBar.open('Se ha producido un error desconocido', 'Aceptar');
        }

        return throwError(() => error);
      })
    );
  }
}
