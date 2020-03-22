import { Component, OnInit } from '@angular/core';

import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isDesktop: boolean;

  constructor(private Layout: LayoutService) {}

  ngOnInit() {
    this.Layout.isDesktop$.subscribe(isDesktop => (this.isDesktop = isDesktop));
  }

  toggleNav() {
    if (!this.isDesktop) {
      this.Layout.toggleNav();
    }
  }
}
