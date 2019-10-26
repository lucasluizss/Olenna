import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: AddUserComponent },
	{ path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
