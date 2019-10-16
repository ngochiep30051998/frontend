import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';

// Import Containers

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../customer/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'product-category',
        loadChildren: () => import('../customer/product-category/product-category.module').then(m => m.ProductCategoryModule)
      },
      {
        path: 'product-detail',
        loadChildren: () => import('../customer/product-detail/product-detail.module').then(m => m.ProductDetailModule)
      },
      {
        path: 'shopping-cart',
        loadChildren: () => import('../customer/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('../customer/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
