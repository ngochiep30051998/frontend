import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
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
    public imageList: File;
    public product: any;
    public listProductCategory = [];
    constructor(
        private formBuilder: FormBuilder,
        public activatedRoute: ActivatedRoute,
        private apiService: ApiService,
        public helperService: HelperService,
        public router: Router
    ) {
        this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
        this.getListCatalog();
        this.initForm();

    }

    ngOnInit() {
    }

    async initForm() {
        try {
            this.helperService.showLoading();
            this.productForm = this.formBuilder.group({
                sku: ['', Validators.required],
                name: ['', Validators.required],
                content: [''],
                price: [0, Validators.required],
                catalogId: [1],
                promotionPrice: [],
                amount: [],
                topFeature: [''],
                image: [null],
                imageList: [null]
            });
            if (this.productId) {
                const res: any = await this.apiService.getProductById(this.productId);
                this.productForm.patchValue({
                    sku: res.data.SKU,
                    name: res.data.Name,
                    content: res.data.Content,
                    price: res.data.Price,
                    catalogId: res.data.CatalogId,
                    promotionPrice: res.data.PromotionPrice,
                    amount: res.data.Amount,
                    topFeature: res.data.TopFeature,
                });
                // console.log(this.product)
            }
            this.helperService.hideLoading();

        } catch (e) {
            console.log(e);
            this.helperService.hideLoading();
        }

    }



    async addProduct() {
        try {
            console.log(this.productForm.value);
            this.helperService.showLoading();
            const product = this.productForm.value;
            const res = await this.apiService.addProduct(product);
            this.helperService.hideLoading();
            this.helperService.showAlert('success', 'thêm mới thành công')
        } catch (e) {
            console.log(e)
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

    async updateProduct() {
        try {
            console.log(this.productForm.value);
            this.helperService.showLoading();
            const product: any = this.productForm.value;
            // tslint:disable-next-line:radix
            product.productId = parseInt(this.productId);
            const res = await this.apiService.updateProduct(product);
            this.helperService.hideLoading();
            this.helperService.showAlert('success', 'Cập nhật thành công')
        } catch (e) {
            console.log(e)
            this.helperService.hideLoading();
        }
    }

    getListCatalog() {
        this.apiService.getAllCatalog().then((res: any) => {
            this.listProductCategory = res.data;
        });
    }
    get f() { return this.productForm.controls; }
}
