import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
    selector: 'app-shop-management',
    templateUrl: './shop-management.component.html',
    styleUrls: ['./shop-management.component.scss']
})
export class ShopManagementComponent implements OnInit {

    public listProvider: any = [];
    constructor(
        private apiService: ApiService,
        public helperService: HelperService
    ) {
        this.getAllProvider();
    }

    ngOnInit() {
    }

    getAllProvider() {
        this.apiService.getAllProvider().then((res: any) => {
            this.listProvider = res.data.filter(x => x.Status !== 2);
        });
    }
    async upgradeProvider(id, index) {
        this.helperService.showLoading();
        try {
            const res: any = await this.apiService.upgradeProvider(id);
            console.log(res);
            this.helperService.hideLoading();
            this.helperService.showAlert('success', 'Thành công', res.message);
            this.listProvider[index].Status = 1;
        } catch (e) {
            console.log(e);
            this.helperService.hideLoading();
        }
    }

    async deleteProvider(id, index) {
        this.helperService.showLoading();
        try {
            const res: any = await this.apiService.deleteProvider(id);
            console.log(res);
            this.helperService.hideLoading();
            this.helperService.showAlert('success', 'Thành công', res.message);
            this.listProvider.splice(index, 1);
        } catch (e) {
            console.log(e);
            this.helperService.hideLoading();
        }
    }
}
