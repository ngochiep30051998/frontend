import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HelperService } from '../helper/helper.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    public cart: any = [];
    public cartSubject = new BehaviorSubject({});
    constructor(
        private helperService: HelperService
    ) {
        this.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }

    public addToCart(product: any, quantity: number) {
        const index = this.cart.findIndex(x => x.Id === product.Id);
        if (index > -1) {
            this.cart[index].quantity += quantity;
        } else {
            product.quantity = quantity;
            this.cart.push(product);
        }
        this.updateCart();
        this.helperService.showAlert('success','Thành công','Sản phẩm đã được thêm vào giỏ hàng');
        // localStorage.setItem('cart', JSON.stringify(this.cart));
        // this.cartSubject.next(this.cart);
    }

    public removeProduct(product: any, quantity: number) {
        const index = this.cart.findIndex(x => x.Id === product.Id);
        if (index > -1) {
            this.cart[index].quantity -= quantity;
            // this.cartSubject.next(this.cart);
            if (this.cart[index].quantity === 0) {
                this.cart.splice(index, 1);
            }
            this.updateCart();
        }
    }

    public getTotalProduct() {
        let total = 0;
        this.cart.forEach((product: any) => {
            total += product.quantity;
        });
        return total;
    }

    public getTotalPrice() {
        let totalPrice = 0;
        this.cart.forEach((product: any) => {
            totalPrice += product.PromotionPrice ? product.quantity * product.PromotionPrice : product.quantity * product.Price;
        });
        return totalPrice;
    }

    public getSubTotalPrice(product: any) {
        return product.quantity * (product.PromotionPrice ? product.PromotionPrice : product.Price);
    }

    public updateCart() {
        this.cart = this.cart.filter(x => x.quantity > 0);
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    public clearCart() {
        localStorage.removeItem('cart');
        this.cart = [];
    }

    public getCartItem() {
        return JSON.parse(localStorage.getItem('cart'));
    }
}
