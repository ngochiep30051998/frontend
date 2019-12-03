import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { MenuItem } from 'primeng/api';
import { ApiService } from '../../../services/api/api.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { HelperService } from '../../../services/helper/helper.service';
import { CartService } from '../../../services/shoppingCart/cart.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [
        { provide: CarouselConfig, useValue: { interval: 1500, noPause: false } },
    ]
})
export class HomeComponent implements OnInit, OnDestroy {

    public myInterval: number | false = 6000;
    public slides: any[] = [];
    public activeSlideIndex: number = 0;
    public noWrapSlides: boolean = false;
    public items: MenuItem[] = [];
    public cars: any;

    public listCatalog = [];
    public listProvider = [];

    public listproduct: any = {
        product1: [],
        product2: [],
        product3: []
    };
    public responsiveOptions: any;
    constructor(
        private apiService: ApiService,
        public router: Router,
        public authService: AuthService,
        public helperService: HelperService,
        public cartService: CartService
    ) {
        for (let i = 0; i < 4; i++) {
            this.addSlide();
        }
        this.getListMenuItem();

    }
    ngOnInit() {

    }

    getListMenuItem() {
        this.helperService.showLoading();
        const catalogs = this.apiService.getAllCatalog();
        const providers = this.apiService.getAllProvider();
        Promise.all([catalogs, providers]).then((res: any) => {
            const listCatalog = res[0].data.sort((a: any, b: any) => {
                return b.ProductAmount - a.ProductAmount;
            });
            this.listCatalog = listCatalog;
            this.listProvider = res[1].data.filter(x => x.Status === 1).splice(0, 8);
            this.getProductByCatId(this.listCatalog[0].CatalogId, 'product1');
            this.getProductByCatId(this.listCatalog[1].CatalogId, 'product2');
            this.getProductByCatId(this.listCatalog[2].CatalogId, 'product3');
            this.listProvider.forEach((provider) => {
                const item: MenuItem = {
                    label: provider.Name,
                    url: `#/provider/${provider.Id}`
                };
                this.items.push(item);
            });
            this.helperService.hideLoading();
        }).catch(err => {
            this.helperService.hideLoading();
            console.log(err);
        });
    }

    getProductByCatId(id: number, productList: any) {
        this.apiService.getProductByCatalogId(id).subscribe((res: any) => {
            this.listproduct[productList] = res.data.slice(0, 9);

        });
    }
    ngOnDestroy(): void {
        this.myInterval = 0;
        this.noWrapSlides = true;
        this.myInterval = false;
    }

    addSlide(): void {
        this.slides.push({
            image: `https://lorempixel.com/900/500/abstract/${this.slides.length % 8 + 1}/`
        });
    }

    removeSlide(index?: number): void {
        const toRemove = index ? index : this.activeSlideIndex;
        this.slides.splice(toRemove, 1);
    }

    addToCart(product: any, quantity: number) {
        if (this.authService.isCustomer()) {
            this.cartService.addToCart(product, quantity);
            console.log(product);
        } else {
            this.helperService.showAlert('error', 'Bạn phải đăng nhập trước');
            return;
        }
    }
    gotoProductDetail(productId: any) {
        this.router.navigate(['product-detail', productId]);
    }

    gotoCategory(catId: any) {

    }
}
