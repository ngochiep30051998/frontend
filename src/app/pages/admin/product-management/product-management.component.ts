import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'app-product-management',
    templateUrl: './product-management.component.html',
    styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

    public listProduct: any;
    public currentPage = 0;
    public totalPage = [];
    public totalItem = 0;
    constructor(
        private apiService: ApiService,
        public helperService: HelperService,
        public router: Router,
        public authService: AuthService
    ) {
        if (this.authService.isSupperAdmin()) {
            this.getListProduct(0);
        } else if (this.authService.isAdmin() && !this.authService.isSupperAdmin()) {
            this.getProductByProvier();
        }
    }

    ngOnInit() {
    }

    getListProduct(page: any) {
        this.helperService.showLoading();
        this.apiService.getALlProduct(page).subscribe((res: any) => {
            this.listProduct = res.data.listProduct;
            this.totalPage = Array(res.data.pageAmount).fill(0).map((x, i) => i);
            this.totalItem = res.data.pageAmount * 20;
            this.currentPage = res.data.currentPage;
            this.helperService.hideLoading();
        }, err => {
            this.helperService.hideLoading();
        });
    }

    async getProductByProvier() {
        const user = this.authService.getCurrentUser();
        this.apiService.getProductByProviderId(user.ProviderId).subscribe((res: any) => {
            this.listProduct = res.data;
            this.totalPage = [1];
            this.totalItem = res.data.length;
            this.currentPage = 0;
            this.helperService.hideLoading();
        }, err => {
            this.helperService.hideLoading();
        })
    }
    goToProductDetail(productId: any) {
        this.router.navigate(['admin/product', productId]);
    }

    deleteProduct(productId, index) {
        this.helperService.showLoading();
        this.apiService.deleteProduct(productId).then((res: any) => {
            console.log(res)
            this.helperService.showAlert('success', res.message);
            // this.getListProduct(this.currentPage);
            this.listProduct.splice(index, 1);
            this.helperService.hideLoading();
        }, err => {
            console.log(err);
            this.helperService.hideLoading();
        });
    }
}
