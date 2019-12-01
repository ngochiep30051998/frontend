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
                this.messageService.add({ severity: 'error', summary: 'Đăng nhập không thành công', detail: 'phải nhập đầy đủ thông tin' });
                return;
            }
            const res: any = await this.apiService.login(user);

            // this.messageService.add({ severity: 'success', summary: 'Đăng nhập thành công' });
            if (res.user.roles.find(x => x.Name === ADMIN.name) || res.user.roles.find(x => x.Name === SUPER_ADMIN.name)) {
                localStorage.setItem('userInfo', JSON.stringify({ data: res }));
                this.router.navigate(['admin/dashboard']);

            } else {
                // localStorage.setItem('userInfo', JSON.stringify({ data: res.customer }));
                await this.apiService.logout();
                // tslint:disable-next-line:max-line-length
                this.messageService.add({ severity: 'error', summary: 'Đăng nhập không thành công', detail: 'Bạn không có quyền đăng nhập vảo trang quản trị' });
            }
            this.helperService.hideLoading();

        } catch (e) {
            this.helperService.hideLoading();
            console.log(e)
            if (e.error && e.error.message) {
                this.messageService.add({ severity: 'error', summary: 'Đăng nhập không thành công', detail: e.error.message });
                return;
            }
            this.messageService.add({ severity: 'error', summary: 'Đăng nhập không thành công' });
        }
    }
    get f() { return this.loginForm.controls; }
}
