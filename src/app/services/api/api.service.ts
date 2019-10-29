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
}
