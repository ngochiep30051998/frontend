import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../services/shoppingCart/cart.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
    public cart: any = [];
    constructor(
        public cartService: CartService,
        private router: Router,
    ) {
        // this.cartService.cartSubject.subscribe((res: any) => {
        //     this.cart = res;
        //     console.log(this.cart);
        // });
        this.cart = this.cartService.cart;
        console.log(this.cart);
    }

    ngOnInit() {
    }

    addProduct($event: any, index: number) {
        const total: any = $event.target.value;
        // if (total > this.cart[index].Amount) {
        //     total = this.cart[index].Amount;
        // }
        // tslint:disable-next-line:radix
        this.cart[index].quantity = parseInt(total);
        if (this.cart[index].quantity === 0) {
            this.cart.splice(index, 1);
        }
        this.cartService.updateCart();
    }
    gotoPage(page) {
        this.router.navigate([page]);
    }
    ngOnDestroy() {
        // this.cartService.cartSubject.unsubscribe();
    }
}
