import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from './guards/user-auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './user-pages/dashboard/dashboard.component';
import { TodoComponent } from './user-pages/todo/todo.component';
import { UserVerifyComponent } from './user-verify/user-verify.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: "todo/:id",
    component: TodoComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: "verify/:code",
    component: UserVerifyComponent
  },
  {
    path: "**",
    redirectTo: "/",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
