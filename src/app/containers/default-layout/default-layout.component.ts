import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { CartService } from '../../services/shoppingCart/cart.service';


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
        private helperService: HelperService,
        private router: Router,
        private cartService: CartService,
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
        this.helperService.showLoading();
        try {
            await this.apiService.logout();
            this.router.navigate(['admin/login']);
            localStorage.clear();
            this.helperService.hideLoading();
        } catch (e) {
            this.helperService.hideLoading();
            console.log(e.error.message);
        }
    }
    ngOnDestroy(): void {
        this.changes.disconnect();
    }
}
