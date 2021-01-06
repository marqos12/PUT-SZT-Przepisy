import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../api/api';
import { RequestParams, RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private user = new BehaviorSubject<User>(null);
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private restService: RestService) {
    this.checkLoggedUserRequest();
  }

  public login(loginData): Observable<any> {
    const params: RequestParams = {
      url: "/api/auth/login",
      body: loginData,
      next: this.onLoginSuccess.bind(this),
      error: this.onError.bind(this, 'Logowanie nie powiodło się!')
    }
    return this.restService.postWithParams(params);
  }

  public register(registerData): Observable<any> {
    const params: RequestParams = {
      url: "/api/auth/register",
      body: registerData,
      next: this.onSuccess.bind(this, 'Rejestracja powiodła się!', '/login'),
      error: this.onError.bind(this, 'Rejestracja nie powiodła się!')
    }
    return this.restService.postWithParams(params);
  }

  onSuccess(summary, path) {
    this.messageService.add({ severity: 'success', summary: summary });
    this.router.navigate([path]);
  }

  onError(summary, data) {
    this.messageService.add({ severity: 'error', summary: summary, detail: data.error });
  }

  onLoginSuccess() {
    this.checkLoggedUserRequest();
    this.onSuccess('Zalogowano!', '/');
  }

  public getLoggedUser(): Observable<User> {
    return this.user.asObservable();
  }

  private checkLoggedUserRequest() {
    this.http.get<User>("/api/auth/whoami").subscribe(
      {
        next: this.checkLoggedUserResponse.bind(this),
        error: this.userNotAuthorized.bind(this)
      }
    );
  }

  private checkLoggedUserResponse(user) {
    this.user.next(user?.principal);
  }

  public userNotAuthorized() {
    this.user.next(null);
  }

  public logout(): Observable<any> {
    const params: RequestParams = {
      url: "/api/auth/logout",
      body: {},
      next: this.onLogoutSuccess.bind(this),
      error: this.onError.bind(this, 'Błąd wylogowania!')
    }
    return this.restService.postWithParams(params);
  }

  onLogoutSuccess() {
    this.checkLoggedUserRequest();
    this.onSuccess('Wylogowano!', '/');
  }

}
