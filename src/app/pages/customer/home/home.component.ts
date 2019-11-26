import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { MenuItem } from 'primeng/api';
import { ApiService } from '../../../services/api/api.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Router } from '@angular/router';

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
    public items: MenuItem[];
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
        public router: Router
    ) {
        for (let i = 0; i < 4; i++) {
            this.addSlide();
        }
        // this.getListMenuItem();

    }
    ngOnInit() {
        this.getProductByCatId(1, 'product1');
        this.getProductByCatId(2, 'product2');
        this.getProductByCatId(3, 'product3');
        this.items = [
            {
                label: 'Hoàng hà mobile',
                url: '#/product-detail'
            },
            {
                label: 'Thế giới di động'
            },
            {
                label: 'Tech world'
            },
            {
                label: 'Nhật Bảo mobile'
            },
            {
                label: 'Đào Thạch Mobile'
            },
            {
                label: 'Nhật Cường mobile'
            },
            {
                label: 'Bảo Tuyết Mobile'
            },
            {
                label: 'Cellphones'
            }
        ];
    }

    getListMenuItem() {
        const catalogs = this.apiService.getAllCatalog();
        const providers = this.apiService.getAllProvider();
        forkJoin([catalogs, providers]).subscribe((res: any) => {
            this.listCatalog = res[0].data;
            this.listProvider = res[1].data;
            for (let i = 0; i < 5; i++) {
                const item = {

                }
            }
            console.log(res);
        });

    }

    getProductByCatId(id: number, productList: any) {
        this.apiService.getProductByCatalogId(id).subscribe((res: any) => {
            this.listproduct[productList] = res.data.slice(0, 9);
            console.log(res)

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

    addToCart(product: any) {
        console.log(product);
    }
    gotoProductDetail(productId: any) {
        this.router.navigate(['product-detail', productId])
    }

    gotoCategory(catId: any) {

    }
}
