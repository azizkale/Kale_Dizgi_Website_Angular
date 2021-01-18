import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminconsoleComponent } from './adminconsole/adminconsole.component';
import { AuthGuard } from './Auth.Guard';
import { ContactComponent } from './contact/contact.component';
import { DizgimizanpajComponent } from './dizgimizanpaj/dizgimizanpaj.component';
import { LoginComponent } from './login/login.component';
import { MotherPageComponent } from './mother-page/mother-page.component';

const routes: Routes = [
  { path: '', component: MotherPageComponent },
  { path: 'motherPage', component: MotherPageComponent },
  {
    path: 'adminconsole',
    canActivate: [AuthGuard],
    component: AdminconsoleComponent,
  },
  { path: 'contact', component: ContactComponent },
  { path: 'dizgimizanpaj', component: DizgimizanpajComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
