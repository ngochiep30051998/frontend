import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper.service';
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    public text = '';
    public productForm: FormGroup;
    public productId: any;
    public listProductCategory = [
        {
            id: 1,
            name: 'xiaomi'
        },
        {
            id: 2,
            name: 'apple'
        },
        {
            id: 3,
            name: 'samsung'
        },
    ];
    constructor(
        private formBuilder: FormBuilder,
        public activatedRoute: ActivatedRoute,
        private apiService: ApiService,
        public helperService: HelperService,
        public router: Router
    ) {
        this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
        this.initForm();
    }

    ngOnInit() {
    }

    initForm() {
        if (this.productId) {
            console.log('update')
            this.productForm = this.formBuilder.group({
                SKU: ['', Validators.required],
                Name: ['', Validators.required],
                Content: [''],
                Price: [0, Validators.required],
                CatalogId: [],
                PromotionPrice: [],
                Amount: [],
                TopFeature: [''],
                Image: [],
                ImageList: []
            });
        } else {
            console.log('add')
            this.productForm = this.formBuilder.group({
                SKU: ['', Validators.required],
                Name: ['', Validators.required],
                Content: [''],
                Price: [0, Validators.required],
                CatalogId: [],
                PromotionPrice: [],
                Amount: [],
                TopFeature: [''],
                Image: [],
                ImageList: []
            });
        }
    }



    async addProduct() {
        try {
            console.log(this.productForm.value);
            this.helperService.showLoading();
            const product = this.productForm.value;
            const res = await this.apiService.addProduct(product);
            this.helperService.showLoading();
        } catch (e) {
            this.helperService.showLoading();
        }
    }

    get f() { return this.productForm.controls; }
}
