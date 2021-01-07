import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

  public postWithParams<T>(params: RequestParams) {
    const answerSubject: Subject<T> = new Subject();
    this.http.post(params.url, params.body).subscribe({
      next: this.onRequestSuccess.bind(this, answerSubject, params),
      error: this.onRequestError.bind(this, answerSubject, params)
    });
    return answerSubject.asObservable();
  }

  onRequestSuccess(registerAnswer: Subject<any>, params: RequestParams, data) {
    params.next(data);
    registerAnswer.next(data);
    registerAnswer.complete();
  }

  onRequestError(registerAnswer: Subject<any>, params: RequestParams, data) {
    params.error(data);
    registerAnswer.next(data);
    registerAnswer.complete();
  }

  private handleError(error: HttpErrorResponse) {
    console.log("Error: ", error)
    return [];
  }
}

export interface RequestParams {
  url: string;
  body: any;
  next: any;
  error: any;
}
