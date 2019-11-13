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
    public image: File;
    public imageList: FileList;
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
                sku: ['', Validators.required],
                name: ['', Validators.required],
                content: [''],
                price: [0, Validators.required],
                catalogId: [],
                promotionPrice: [],
                amount: [],
                topFeature: [''],
                image: [null],
                imageList: [null]
            });
        } else {
            console.log('add')
            this.productForm = this.formBuilder.group({
                sku: ['', Validators.required],
                name: ['', Validators.required],
                content: [''],
                price: [0, Validators.required],
                catalogId: [],
                promotionPrice: [],
                amount: [],
                topFeature: [''],
                image: [null],
                imageList: [null]
            });
        }
    }



    async addProduct() {
        try {
            console.log(this.productForm.value);
            this.helperService.showLoading();
            const product = this.productForm.value;
            const res = await this.apiService.addProduct(product);
            this.helperService.hideLoading();
        } catch (e) {
            this.helperService.hideLoading();
        }
    }
    onchangeImage(event) {
        const image = (event.target as HTMLInputElement).files[0];
        this.productForm.patchValue({
            image: image
        });
    }

    onchangeImageList(event) {
        const image = (event.target as HTMLInputElement).files;
        this.productForm.patchValue({
            imageList: image
        });
        console.log(this.productForm.value)
    }
    get f() { return this.productForm.controls; }
}
