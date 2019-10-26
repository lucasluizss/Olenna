import { UserService } from './../../services/user/user.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import User from 'src/app/models/user/user.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	currentUser: User;
	currentUserSubscription: Subscription;
	users: User[] = [];

	constructor(
		private authenticationService: AuthService,
		private userService: UserService
	) {
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		});
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		// unsubscribe to ensure no memory leaks
		this.currentUserSubscription.unsubscribe();
	}

	deleteUser(id: number): void {
		this.userService.delete(id).pipe(first()).subscribe(() => {
			this.loadAllUsers();
		});
	}

	private loadAllUsers(): void {
		this.userService.getAll().pipe(first()).subscribe(users => {
			this.users = users;
		});
	}
}
