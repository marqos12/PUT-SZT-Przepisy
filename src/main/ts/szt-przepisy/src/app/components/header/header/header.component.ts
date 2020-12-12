import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
  
  constructor() { }


  ngOnInit() {
      this.items = [
          {
              label: 'Lista przepisów',
              icon: 'pi pi-fw pi-list',
              routerLink:"/"
          },
          {
              label: 'Dodaj przepis',
              icon: 'pi pi-fw pi-plus',
              routerLink:"add"
          }
      ];
  }

}
