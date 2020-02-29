import { UserService } from './../../services/user/user.service';
import { AuthService } from './../../services/auth/auth.service';
import { AlertService } from './../../services/shared/alert.service';
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

	public currentUser: User;
	public users: User[] = [];
	private currentUserSubscription: Subscription;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
		private alertService: AlertService
	) {
		this.currentUserSubscription = _authService.currentUser
			.subscribe(response => {
				this.currentUser = response;
			});
	}

	ngOnInit(): void {
		this.loadAllUsers();
	}

	ngOnDestroy(): void {
		this.currentUserSubscription.unsubscribe();
	}

	public deleteUser(id: string): void {
		this._userService.delete(id)
			.subscribe(response => {
				this.alertService.success(response.Message);
				this.loadAllUsers();
			}, error => {
				this.alertService.error(error.error.Message);
			});
	}

	private loadAllUsers(): void {
		this._userService.getAll().pipe(first())
			.subscribe(response => {
				this.users = response.Users;
			});
	}
}
