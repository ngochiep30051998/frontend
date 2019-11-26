import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { Router } from '@angular/router';

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
        public router: Router
    ) {
        this.getListProduct(0);

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

    goToProductDetail(productId: any) {
        this.router.navigate(['admin/product', productId]);
    }
}
