import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(
        public spinner: NgxSpinnerService,
        public messageService: MessageService,
    ) { }

    public showLoading() {
        this.spinner.show();
    }
    public hideLoading() {
        this.spinner.hide();
    }
    public showAlert(type: any, summary?: any, detail?: any) {
        this.messageService.add({ severity: type, summary: summary, detail: detail });
    }
    public markFormGroupTouched(formGroup) {
        (Object as any).values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }
}
