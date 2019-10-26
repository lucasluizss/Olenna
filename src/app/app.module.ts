import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './security/http-interceptor';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { AddUserComponent } from './components/user/add-user/add-user.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		NavMenuComponent,
		AddUserComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule,
		RouterModule.forRoot([
			{ path: '', component: LoginComponent, pathMatch: 'full' },
			{ path: 'add-user', component: AddUserComponent },
		])
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: Interceptor,
		multi: true
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
