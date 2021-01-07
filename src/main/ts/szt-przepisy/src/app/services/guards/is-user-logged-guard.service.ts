import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/api/api';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserLoggedGuardService implements CanActivate {

  constructor(
    public userAuthService: UserAuthService,
    public router: Router,
    private messageService: MessageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isLogged = new ReplaySubject<boolean>();
    const invertAuth = route.data.invertAuth;
    this.userAuthService.getLoggedUser().pipe(first()).subscribe(this.isAuthenticated.bind(this, isLogged, invertAuth));
    return isLogged.asObservable();
  }

  isAuthenticated(isLogged: ReplaySubject<boolean>, invertAuth: boolean, user: User) {
    if (!invertAuth && user || invertAuth && !user)
      isLogged.next(true);
    else {
      this.messageService.add({ severity: "warn", summary: "Brak uprawnień" })
      this.router.navigate(['/']);
      isLogged.next(false);
    }
    isLogged.complete();
  }
}
