import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SeatReserveComponent } from './seat-reserve/seat-reserve.component';
import { SuccessPageComponent } from './success-page/success-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'reserve', component: SeatReserveComponent},
  { path: 'success-page', component: SuccessPageComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
