import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(
    private apiService: ApiService,
    private router: Router,
    @Inject(DOCUMENT) _document?: any,
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  async logout() {
    try {
      await this.apiService.logout();
      this.router.navigate(['admin/login']);
      localStorage.removeItem('adminInfo');
    } catch (e) {
      console.log(e);
    }
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
