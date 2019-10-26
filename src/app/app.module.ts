import { NgModule } from '@angular/core';
import { appRoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from './security/http.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//#region Components Imports
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
//#endregion

@NgModule({
	declarations: [
		AlertComponent,
		AppComponent,
		HomeComponent,
		LoginComponent,
		NavMenuComponent,
		AddUserComponent
	],
	imports: [
		appRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		HttpClientModule
	],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: Interceptor,
		multi: true
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
