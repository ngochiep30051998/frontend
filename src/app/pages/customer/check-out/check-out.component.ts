import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { CartService } from '../../../services/shoppingCart/cart.service';
import { AuthService } from '../../../services/auth/auth.service';

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
                this.helperService.showAlert('error', 'Thất bại', 'Không có sản phẩm nào trong rỏ hàng');
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
}
