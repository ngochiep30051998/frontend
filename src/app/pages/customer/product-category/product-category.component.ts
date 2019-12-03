import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/shoppingCart/cart.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'app-product-category',
    templateUrl: './product-category.component.html',
    styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

    public items: MenuItem[];
    public listProduct: any = [];
    public catId: any;
    public listProvier: any = [];
    constructor(
        private apiService: ApiService,
        private helperService: HelperService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public cartService: CartService,
        public authService: AuthService
    ) {
        this.activatedRoute.paramMap.subscribe((res: any) => {
            this.catId = res.get('catId');
            this.getProduct();
        });
        this.getListProvider();
    }

    ngOnInit() {

    }

    getProduct() {
        this.helperService.showLoading();
        this.apiService.getProductByCatalogId(this.catId).subscribe((res: any) => {
            this.listProduct = res.data;
            console.log(res);
            this.helperService.hideLoading();
        }, err => {
            this.helperService.hideLoading();
            console.log(err);
        });
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

    getListProvider() {
        this.apiService.getAllProvider().then((res: any) => {
            this.listProvier = res.data.filter(x => x.Status === 1);
        });
    }
}
