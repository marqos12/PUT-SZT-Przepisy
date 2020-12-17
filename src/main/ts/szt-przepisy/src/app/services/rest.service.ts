import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string) {
    return this.http.get<T>(url).pipe(
      catchError(this.handleError)
    );
  }

  public post(url: string, body) {
    return this.http.post(url, body).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("Error: ", error)
    return [];
  }
}
