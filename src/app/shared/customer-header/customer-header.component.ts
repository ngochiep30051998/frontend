import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from '../../services/helper/helper.service';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { ADMIN, SUPER_ADMIN, USER_ROLES } from '../../constants/constant';
@Component({
    selector: 'app-customer-header',
    templateUrl: './customer-header.component.html',
    styleUrls: ['./customer-header.component.scss']
})
export class CustomerHeaderComponent implements OnInit {

    @ViewChild('modalLogin', { static: false }) modalLogin: ElementRef;

    public modalRef: BsModalRef;
    public items: MenuItem[];
    public loginForm: FormGroup;
    public userRoles = USER_ROLES;
    constructor(
        public modalService: BsModalService,
        private formBuilder: FormBuilder,
        public helperService: HelperService,
        private apiService: ApiService,
        private router: Router,
        private messageService: MessageService,
    ) {
        this.initForm();
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Apple', icon: 'fa fa-fw fa-apple',
            },
            {
                label: 'Huawei', icon: 'fa fa-fw fa-mobile',
            },
            {
                label: 'Oppo', icon: 'fa fa-fw fa-android',
            },
            {
                label: 'Samsung', icon: 'fa fa-fw fa-android',
            },
            {
                label: 'ViVo', icon: 'fa fa-fw fa-android',
            },
            {
                label: 'Realme', icon: 'fa fa-fw fa-android',
            },
        ];
    }

    openModal() {
        this.modalRef = this.modalService.show(this.modalLogin);
    }
    closeModalDel() {
        this.modalService.hide(1);
    }

    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    async login() {
        this.helperService.showLoading();
        try {
            const user = this.loginForm.value;
            if (this.loginForm.invalid) {
                this.helperService.hideLoading();
                return;
            }
            console.log(user)

            const res: any = await this.apiService.login(user);
            this.helperService.hideLoading();

        } catch (e) {
            this.messageService.add({ severity: 'error', summary: 'Đăng nhập không thành công', detail: e.error.message });
            console.log(e)
            this.helperService.hideLoading();
        }
    }
    get f() { return this.loginForm.controls; }
}


