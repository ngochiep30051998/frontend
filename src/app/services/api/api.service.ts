import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../constants/constant';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private url = SERVER_URL;
    constructor(
        private http: HttpClient
    ) { }

    login(req) {
        const urlLogin = this.url + 'auth/login';
        return new Promise((resolve, reject) => {
            this.http.post(urlLogin, req).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    logout() {
        const url = this.url + 'auth/logout';
        return new Promise((resolve, reject) => {
            this.http.get(url).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }
    getALlProduct(page: any) {
        const url = page !== 0 ? `${this.url}product/list-product?page=${page}` : `${this.url}product/list-product`;
        return this.http.get(url);
        // return new Promise((resolve, reject) => {
        //     this.http.get(url).subscribe(res => {
        //         resolve(res);
        //     }, err => {
        //         reject(err);
        //     });
        // });
    }

    addProduct(product: any) {
        const url = this.url + 'product/add-new-product';
        const formData: FormData = new FormData();
        formData.append('amount', product.amount);
        formData.append('catalogId', product.catalogId);
        formData.append('content', product.content);
        formData.append('image', product.image);
        for (const key in product.imageList) {
            if (product.imageList[key]) {
                formData.append('imageList', product.imageList[key]);
            }
        }
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('promotionPrice', product.promotionPrice);
        formData.append('sku', product.sku);
        formData.append('topFeature', product.topFeature);
        return new Promise((resolve, reject) => {
            this.http.post(url, formData).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    getProductById(productId: any) {
        const url = `${this.url}product/product-details/${productId}`;
        return new Promise((resolve, reject) => {
            this.http.get(url).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }
    getAllProvider() {
        const url = this.url + 'provider/list-providers';
        return this.http.get(url);
    }

    getAllCatalog() {
        const url = this.url + 'catalog/list-catalogs';
        return this.http.get(url);
    }

    getProductByCatalogId(catalogid: any) {
        const url = `${this.url}catalog/list-products/${catalogid}`;
        return this.http.get(url);
        // return new Promise((resolve, reject) => {
        //     this.http.get(url).subscribe(res => {
        //         resolve(res);
        //     }, err => {
        //         reject(err);
        //     });
        // });
    }

    getProductByProviderId(providerId: any) {
        const url = `${this.url}provider/list-products/${providerId}`;
        return new Promise((resolve, reject) => {
            this.http.get(url).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    sighUp(user: any) {
        const url = this.url + 'auth/register';
        return new Promise((resolve, reject) => {
            this.http.post(url, user).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }
}
