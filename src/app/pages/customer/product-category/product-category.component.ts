import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  public items: MenuItem[];
  
  constructor() { }

  ngOnInit() {
    this.items = [
      {
          label: 'TV', icon: 'fa fa-fw fa-check',
      },
      {
          label: 'Sports', icon: 'fa fa-fw fa-soccer-ball-o',
      },
      {
          label: 'TV', icon: 'fa fa-fw fa-check',
      },
      {
          label: 'TV', icon: 'fa fa-fw fa-check',
      },
      {
          label: 'TV', icon: 'fa fa-fw fa-check',
      },
  ];
  }

}
