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
        path: 'product-category/:catId',
        loadChildren: () => import('../customer/product-category/product-category.module').then(m => m.ProductCategoryModule)
      },
      {
        path: 'provider/:providerId',
        loadChildren: () => import('../customer/product-by-provider/product-by-provider.module').then(m => m.ProductByProviderModule)
      },
      {
        path: 'product-detail/:id',
        loadChildren: () => import('../customer/product-detail/product-detail.module').then(m => m.ProductDetailModule)
      },
      {
        path: 'shopping-cart',
        loadChildren: () => import('../customer/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('../customer/check-out/check-out.module').then(m => m.CheckOutModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
