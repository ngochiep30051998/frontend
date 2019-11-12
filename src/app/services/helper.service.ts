import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(
        public spinner: NgxSpinnerService
    ) { }

    public showLoading() {
        this.spinner.show();
    }
    public hideLoading() {
        this.spinner.hide();
    }
}
