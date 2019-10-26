import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import User from './models/user/user.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Olenna';

	currentUser: User;

	constructor(
		private router: Router,
		private authenticationService: AuthService
	) {
		this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
	}

	logout(): void {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}
}
