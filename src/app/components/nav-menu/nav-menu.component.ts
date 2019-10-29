import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-nav-menu',
	templateUrl: './nav-menu.component.html',
	styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
	isExpanded = false;

	constructor(
		private router: Router,
		private authenticationService: AuthService
	) { }

	collapse(): void {
		this.isExpanded = false;
	}

	toggle(): void {
		this.isExpanded = !this.isExpanded;
	}

	logout(): void {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}
}
