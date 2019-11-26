import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USER_ROLES, ADMIN, SUPER_ADMIN } from '../../../constants/constant';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HelperService } from '../../../services/helper/helper.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public userRoles = USER_ROLES;
    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        public helperService: HelperService
    ) { }

    ngOnInit() {
        this.initForm();
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
                this.messageService.add({ severity: 'error', summary: 'Đăng nhập không thành công', detail: 'phải nhập đầy đủ thông tin'});
                return;
            }
            const res: any = await this.apiService.login(user);
            if (res.customer.roles.find(x => x.Name === ADMIN.name) || res.customer.roles.find(x => x.Name === SUPER_ADMIN.name)) {
                localStorage.setItem('adminInfo', JSON.stringify({ data: res.customer }));
                // this.messageService.add({ severity: 'success', summary: 'Đăng nhập thành công' });
                this.router.navigate(['admin/dashboard']);
            }
            this.helperService.hideLoading();

        } catch (e) {
            this.messageService.add({ severity: 'error', summary: 'Đăng nhập không thành công', detail: e.error.message });
            this.helperService.hideLoading();
        }
    }
    get f() { return this.loginForm.controls; }
}
