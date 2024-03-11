import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/interfaces/layout/menu-item';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public opened: boolean = true;
  public menu!: MenuItem[];

  constructor(
    public readonly layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.setMenu();
  }

  public toggleSidenav(): void {
    this.opened = !this.opened;
  }

  private setMenu(): void {
    this.menu = [
      {
        name: 'Héroes',
        routerLink: '/heroes'
      }
    ]
  }

}
