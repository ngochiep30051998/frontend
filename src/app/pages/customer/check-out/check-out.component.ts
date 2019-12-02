import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { CartService } from '../../../services/shoppingCart/cart.service';
import { AuthService } from '../../../services/auth/auth.service';
declare let vnpay: any;
@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

    public checkoutForm: FormGroup;
    public checkoutType = 'option1';
    constructor(
        private formBuilder: FormBuilder,
        public activatedRoute: ActivatedRoute,
        private apiService: ApiService,
        public helperService: HelperService,
        public router: Router,
        public cartService: CartService,
        public authService: AuthService
    ) {
        this.initForm();
    }

    ngOnInit() {
        // this.loadStripe();
        this.loadvnpay();
    }

    initForm() {
        const user: any = this.authService.getCurrentUser();
        this.checkoutForm = this.formBuilder.group({
            customerAddress: [user.Address, Validators.required],
            customerPhone: [user.Phone, Validators.required],
            shipmentPrice: [15000]
        });
    }
    async checkOut() {
        this.helperService.markFormGroupTouched(this.checkoutForm);
        if (this.checkoutForm.invalid) {
            return;
        }
        this.helperService.showLoading();
        try {
            const cart = this.cartService.getCartItem();
            if (!cart) {
                this.helperService.showAlert('error', 'Thất bại', 'Không có sản phẩm nào trong giỏ hàng');
                this.helperService.hideLoading();
                return;
            }
            const listProducts: any[] = [];
            cart.forEach(element => {
                listProducts.push({
                    productId: element.Id,
                    quantity: element.quantity,
                    price: element.PromotionPrice ? element.PromotionPrice : element.Price
                });
            });
            let checkOutValue = {
                listProducts: listProducts
            };
            checkOutValue = { ...checkOutValue, ...this.checkoutForm.value };
            const res: any = await this.apiService.checkOut(checkOutValue);
            this.helperService.hideLoading();
            this.cartService.clearCart();
            this.helperService.showAlert('success', 'Thành công', 'gửi yêu cầu thành công');
            this.router.navigate(['home']);

        } catch (e) {
            console.log(e);
            this.helperService.showAlert('error', 'Thất bại', 'gửi yêu cầu thất bại');
            this.helperService.hideLoading();
        }
    }

    // loadStripe() {

    //     if (!window.document.getElementById('stripe-script')) {
    //         const s = window.document.createElement('script');
    //         s.id = 'stripe-script';
    //         s.type = 'text/javascript';
    //         s.src = 'https://checkout.stripe.com/checkout.js';
    //         window.document.body.appendChild(s);
    //     }
    // }
    // pay(amount) {

    //     const handler = (<any>window).StripeCheckout.configure({
    //         key: 'pk_test_lQpl5GshLMX0U94A3D7exC7c',
    //         locale: 'auto',
    //         token: function (token: any) {
    //             // You can access the token ID with `token.id`.
    //             // Get the token ID to your server-side code for use.
    //             console.log(token);
    //             alert('Token Created!!');
    //         }
    //     });

    //     handler.open({
    //         name: 'Demo Site',
    //         description: '2 widgets',
    //         amount: amount * 100
    //     });

    // }


    loadvnpay() {

        if (!window.document.getElementById('vnpay-script')) {
            const s = window.document.createElement('script');
            s.id = 'vnpay-script';
            s.type = 'text/javascript';
            s.src = 'https://pay.vnpay.vn/lib/vnpay/vnpay.js';
            window.document.body.appendChild(s);
        }
    }
    vnpayCheckOut() {
        this.helperService.markFormGroupTouched(this.checkoutForm);
        if (this.checkoutForm.invalid) {
            return;
        }

        const cart = this.cartService.getCartItem();
        if (!cart) {
            this.helperService.showAlert('error', 'Thất bại', 'Không có sản phẩm nào trong giỏ hàng');
            return;
        }
        this.helperService.showLoading();
        const listProducts: any[] = [];
        cart.forEach(element => {
            listProducts.push({
                productId: element.Id,
                quantity: element.quantity,
                price: (element.PromotionPrice ? element.PromotionPrice : element.Price)
            });
        });
        let checkOutValue = {
            listProducts: listProducts,
            amount: this.cartService.getTotalPrice()
        };
        checkOutValue = { ...checkOutValue, ...this.checkoutForm.value };
        this.apiService.vnPayCheckOut(checkOutValue).then((x: any) => {
            // console.log(res)
            this.helperService.hideLoading();
            if (x.code === '00') {
                if ((<any>window).vnpay) {
                    vnpay.open({ width: 768, height: 600, url: x.data });
                } else {
                    location.href = x.data;
                }
                return false;

            } else {
                alert(x.Message);
            }
        }, err => {
            this.helperService.hideLoading();
        });
    }
}
