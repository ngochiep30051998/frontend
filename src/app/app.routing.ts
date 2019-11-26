import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'admin'
    },
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
      },
    ]
  },
  {
    path: '',
    data: {
      title: 'customer'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule)
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/admin/login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: 'sigh-up',
    loadChildren: () => import('./pages/customer/sigh-up/sigh-up.module').then(m => m.SighUpModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
