import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'sign-up', component: UserComponent,
    children: [{path: '', component: SignUpComponent}]
  },
  {
    path: 'sign-in', component: UserComponent,
    children: [{path: '', component: SignInComponent}]
  },
  {
    path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/sign-in', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
