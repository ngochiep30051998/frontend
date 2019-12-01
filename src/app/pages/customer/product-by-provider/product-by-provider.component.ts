import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../../services/shoppingCart/cart.service';
import { AuthService } from '../../../services/auth/auth.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-product-by-provider',
    templateUrl: './product-by-provider.component.html',
    styleUrls: ['./product-by-provider.component.scss']
})
export class ProductByProviderComponent implements OnInit {
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
            this.catId = res.get('providerId');
            this.getData();
        });
    }

    ngOnInit() {
    }
    // getProduct() {
    //   this.helperService.showLoading();
    //   this.apiService.getProductByProviderId(this.catId).subscribe((res: any) => {
    //     this.listProduct = res.data;
    //     console.log(res);
    //     this.helperService.hideLoading();
    //   }, err => {
    //     this.helperService.hideLoading();
    //     console.log(err);
    //   });
    // }

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
    getData() {
        this.helperService.showLoading();
        const listProduct = this.apiService.getProductByProviderId(this.catId);
        const listProvider = this.apiService.getAllProvider();
        forkJoin([listProduct, listProvider]).subscribe((res: any) => {
            this.listProduct = res[0].data;
            this.listProvier = res[1].data;
            console.log(res);
            this.helperService.hideLoading();
        }, err => {
            this.helperService.hideLoading();
            console.log(err);
        })
    }
}
