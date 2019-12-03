import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HelperService } from '../../../services/helper/helper.service';
import { USER_ROLES } from '../../../constants/constant';

@Component({
    selector: 'app-sigh-up',
    templateUrl: './sigh-up.component.html',
    styleUrls: ['./sigh-up.component.scss']
})
export class SighUpComponent implements OnInit {

    public sighUpForm: FormGroup;
    public userRoles = USER_ROLES;

    constructor(
        private apiService: ApiService,
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        public helperService: HelperService
    ) {
        this.initForm();
    }

    ngOnInit() {
    }

    initForm() {
        this.sighUpForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            phone: ['', Validators.required],
            address: [''],
            confirmPassword: ['', Validators.required]
        });
    }

    async sighUp() {
        console.log(this.sighUpForm.value);
        this.helperService.showLoading();
        try {
            this.helperService.markFormGroupTouched(this.sighUpForm);
            if (this.sighUpForm.invalid) {
                this.helperService.hideLoading();
                this.messageService.add({ severity: 'error', summary: 'Đăng ký không thành công', detail: 'phải nhập đầy đủ thông tin' });
                return;
            }
            const res: any = await this.apiService.sighUp(this.sighUpForm.value);
            if (res.customerId) {
                this.messageService.add({ severity: 'success', summary: 'Đăng ký thành công' });
                const login: any = await this.apiService.login({
                    email: this.sighUpForm.value.email,
                    password: this.sighUpForm.value.password
                });
                localStorage.setItem('userInfo', JSON.stringify({ data: login }));
                setTimeout(() => {
                    this.helperService.hideLoading();
                    this.router.navigate(['/home']);
                }, 3000);
            }
        } catch (e) {
            this.helperService.hideLoading();
            // this.messageService.add({ severity: 'error', summary: 'Đăng ký không thành công', detail: e.error.message });
            if (e.error.errorArr) {
                let mes = '';
                e.error.errorArr.forEach((error, index) => {
                  mes += (index + 1) + ' : ' + error + '|';
                });
                this.helperService.showAlert('error', 'đăng ký thất bại', mes);
              }
        }
    }
}
