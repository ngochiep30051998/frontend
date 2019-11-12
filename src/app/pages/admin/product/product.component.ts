import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public text = '';
    constructor() {


    }

    ngOnInit() {
    }

}
