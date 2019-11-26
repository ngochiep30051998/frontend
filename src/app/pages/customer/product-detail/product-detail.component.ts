import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    public productId: any;
    public product: any;
    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute,
        public apiService: ApiService,
        public helperService: HelperService
    ) {
        this.productId = this.activatedRoute.snapshot.paramMap.get('id');
        console.log('this.productId', this.productId);
    }

    async ngOnInit() {
        await this.getProduct();
    }

    async getProduct() {
        this.helperService.showLoading();
        try {
            const res: any = await this.apiService.getProductById(this.productId);
            this.product = res.data;
            this.helperService.hideLoading();
            console.log(this.product)
        } catch (e) {
            console.log(e);
            this.helperService.hideLoading();
        }
    }

}
