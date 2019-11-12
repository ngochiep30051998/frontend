import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';
// Import Containers

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'product/:productId',
        loadChildren: () => import('../admin/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'product',
        loadChildren: () => import('../admin/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../admin/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'product-management',
        loadChildren: () => import('../admin/product-management/product-management.module').then(m => m.ProductManagementModule)
      }
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
