import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User, UserDto } from 'src/app/api/api';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: UserDto;
  items: MenuItem[];

  constructor(private userAuthService: UserAuthService) { }


  ngOnInit() {
    this.items = this.getBasicMenuItems();
    this.registerUserChangeListener();
  }

  registerUserChangeListener() {
    this.userAuthService.getLoggedUser().subscribe(this.onUserLogin.bind(this));
  }

  onUserLogin(user) {
    this.user = user;
    if (user) {
      this.items = [...this.getBasicMenuItems(), ...this.userAuthenticatedMenuItems()];
    } else {
      this.items = [...this.getBasicMenuItems(), ...this.userNotAuthenticatedMenuItems()];
    }
  }

  getBasicMenuItems() {
    return [
      {
        label: 'Lista przepisów',
        icon: 'pi pi-fw pi-list',
        routerLink: "/"
      }
    ]
  }

  userNotAuthenticatedMenuItems() {
    return [
      {
        styleClass: "toRightFull",
        label: 'Rejestracja',
        icon: 'pi pi-fw pi-user-edit',
        routerLink: "/register"
      },
      {
        styleClass: "toRightFull",
        label: 'Logowanie',
        icon: 'pi pi-fw pi-user-plus',
        routerLink: "/login"
      }
    ]
  }

  userAuthenticatedMenuItems() {
    return [
      {
        label: 'Lista planowanych',
        icon: 'pi pi-fw pi-book',
        routerLink: "planned"
      },
      {
        label: 'Dodaj przepis',
        icon: 'pi pi-fw pi-plus',
        routerLink: "add"
      },
      {
        styleClass: "toRightFull",
        label: this.user.username,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Wyloguj',
            icon: 'pi pi-fw pi-power-off',
            command: this.logout.bind(this)
          },
        ]
      },
    ]
  }

  logout() {
    this.userAuthService.logout();
  }
}
