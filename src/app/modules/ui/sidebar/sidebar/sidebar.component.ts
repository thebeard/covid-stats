import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../../../services';
import { RecordsService } from '../../../records';
import { NavItems, NavItem } from './sidebar.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isDesktop: boolean;
  items: NavItem[] = NavItems.filter(item => (environment.production ? !item.dev : true));

  constructor(private Layout: LayoutService, public Stats: RecordsService) {}

  ngOnInit() {
    this.Layout.isDesktop$.subscribe(isDesktop => (this.isDesktop = isDesktop));
  }

  toggleNav() {
    if (!this.isDesktop) {
      this.Layout.toggleNav();
    }
  }
}
