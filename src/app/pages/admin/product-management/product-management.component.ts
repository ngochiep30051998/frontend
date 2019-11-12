import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-management',
    templateUrl: './product-management.component.html',
    styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

    public listProduct = [];
    public currentPage = 0;
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
            console.log(res);
            this.listProduct = res;
            this.helperService.hideLoading();
        }, err => {
            this.helperService.hideLoading();
        });
    }

    goToProductDetail(id: any) {
        this.router.navigate(['']);
    }
}
