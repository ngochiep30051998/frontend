import { Injectable } from '@angular/core';
import { CUSTOMER, ADMIN, SUPER_ADMIN } from '../../constants/constant';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public user: any;
    constructor() {

    }

    public isCustomer() {
        this.user = JSON.parse(localStorage.getItem('userInfo'));
        if (this.user && this.user.data) {
            return this.user.data.user.roles.find(u => u.Name === CUSTOMER.name) ? true : false;
        }
        return false;
    }

    public isAdmin() {
        this.user = JSON.parse(localStorage.getItem('userInfo'));
        if (this.user && this.user.data) {
            return this.user.data.user.roles.find(u => u.Name === ADMIN.name) ? true : false;
        }
        if (this.user && this.user.data) {
            return true;
        }
        return false;
    }

    public isSupperAdmin() {
        this.user = JSON.parse(localStorage.getItem('userInfo'));
        if (this.user && this.user.data) {
            return this.user.data.user.roles.find(u => u.Name === SUPER_ADMIN.name) ? true : false;
        }
        if (this.user && this.user.data) {
            return true;
        }
        return false;
    }

    public getCurrentUser() {
        return JSON.parse(localStorage.getItem('userInfo')).data.user;
    }

}
