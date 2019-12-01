import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { USER_ROLES } from '../../../constants/constant';
import { ApiService } from '../../../services/api/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HelperService } from '../../../services/helper/helper.service';
import * as moment from 'moment';
@Component({
  selector: 'app-sighup-provider',
  templateUrl: './sighup-provider.component.html',
  styleUrls: ['./sighup-provider.component.scss']
})
export class SighupProviderComponent implements OnInit {

  public sighUpForm: FormGroup;
  public userRoles = USER_ROLES;
  public user: any;
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    public helperService: HelperService
  ) {
    const u = JSON.parse(localStorage.getItem('userInfo'));
    if (u && u.data && u.data.user) {
      this.user = u.data.user;
    }
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.sighUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      owner: [this.user.Id, Validators.required],
      cardNumber: ['', Validators.required],
      cardDate: ['', Validators.required],
      cardHolder: ['', Validators.required],
      bank: ['', Validators.required],
      accountNumber: ['', Validators.required],
      isAllowBusiness: [true],
      businessCode: ['0123456789']
    });
  }

  async sighUp() {
    this.helperService.markFormGroupTouched(this.sighUpForm);
    if (this.sighUpForm.invalid) {
      return;
    }
    this.helperService.showLoading();

    try {
      this.sighUpForm.value.cardDate = moment(this.sighUpForm.value.cardDate).format('MM/YY');
      const res: any = await this.apiService.registerProvider(this.sighUpForm.value);
      this.helperService.hideLoading();
      if (res.data.providerId) {
        this.helperService.showAlert('success', 'đăng ký thành công', `mã cửa hàng của bạn là: ${res.data.providerId}`);
      }
    } catch (e) {
      this.helperService.hideLoading();
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
