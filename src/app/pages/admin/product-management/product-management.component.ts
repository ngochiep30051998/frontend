import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';

@Component({
    selector: 'app-product-management',
    templateUrl: './product-management.component.html',
    styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

    public listProduct = [];
    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit() {
        this.getListProduct();
    }

    getListProduct() {
        this.apiService.getALlProduct().subscribe((res: any) => {
            console.log(res)
            this.listProduct = res;
        });
    }

}
