import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/shoppingCart/cart.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    public searchStr: any;
    public listProduct: any = [];
    public listProvier: any = [];
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public apiService: ApiService,
        public helperService: HelperService,
        public authService: AuthService,
        public cartService: CartService
    ) {
        this.activatedRoute.paramMap.subscribe((res: any) => {
            this.searchStr = res.get('searchParam');
            console.log(this.searchStr);
            this.getData();
        });
    }

    ngOnInit() {
    }

    addToCart(product: any, quantity: number) {
        if (this.authService.isCustomer()) {
            this.cartService.addToCart(product, quantity);
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
        const listProduct = this.apiService.searchProduct(this.searchStr);
        const listProvider = this.apiService.getAllProvider();
        forkJoin([listProduct, listProvider]).subscribe((res: any) => {
            this.listProduct = res[0].data;
            this.listProvier = res[1].data.filter((pro: any) => pro.Status === 1);
            console.log(res);
            this.helperService.hideLoading();
        }, err => {
            this.helperService.hideLoading();
            console.log(err);
        });
    }
}

