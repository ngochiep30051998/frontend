import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerAuthGuard } from '../../services/auth/customer-auth.guard';

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
        path: 'search/:searchParam',
        loadChildren: () => import('../customer/search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'checkout',
        canActivate: [CustomerAuthGuard],
        loadChildren: () => import('../customer/check-out/check-out.module').then(m => m.CheckOutModule)
      },
      {
        path: 'sighup-provider',
        canActivate: [CustomerAuthGuard],
        loadChildren: () => import('../customer/sighup-provider/sighup-provider.module').then(m => m.SighupProviderModule)
      },
      {
        path: 'loading/:isCheckout',
        canActivate: [CustomerAuthGuard],
        loadChildren: () => import('../customer/loading/loading.module').then(m => m.LoadingModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
