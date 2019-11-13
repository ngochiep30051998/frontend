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
        const url = `${this.url}product/list-product?page=${page}`;
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
        formData.append('Amount', product.Amount);
        formData.append('CatalogId', product.CatalogId);
        formData.append('Content', product.Content);
        formData.append('Image', product.Image);
        formData.append('ImageList', product.ImageList);
        formData.append('Name', product.Name);
        formData.append('Price', product.Price);
        formData.append('PromotionPrice', product.PromotionPrice);
        formData.append('SKU', product.SKU);
        formData.append('TopFeature', product.TopFeature);
        return new Promise((resolve, reject) => {
            this.http.post(url, formData).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }
}
