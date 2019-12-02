import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../../services/helper/helper.service';
import { CartService } from '../../../services/shoppingCart/cart.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    public isCheckout: any;
    constructor(
        public activatedRoute: ActivatedRoute,
        public router: Router,
        public helperService: HelperService,
        public cartSerVice: CartService
    ) {

        this.helperService.showLoading();
        this.activatedRoute.paramMap.subscribe((res: any) => {
            this.isCheckout = res.get('isCheckout');
            if (this.isCheckout === 'true') {
                this.cartSerVice.clearCart();
                this.helperService.showAlert('success', 'Thành công', 'Thanh toán thành công');
                setTimeout(() => {
                    this.router.navigate(['home']);
                }, 3000);
            } else {
                this.helperService.showAlert('error', 'Thất bại', 'Thanh toán thất bại, vui lòng thực hiện lại giao dịch');
                setTimeout(() => {
                    this.router.navigate(['home']);
                }, 3000);
            }
            this.helperService.hideLoading();
        }, err => {
            this.helperService.hideLoading();
        });
    }

    ngOnInit() {
    }

}
