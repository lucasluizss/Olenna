import { AlertService } from './../../services/shared/alert.service';
import { UserService } from './../../services/user/user.service';
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
		private userService: UserService,
		private alertService: AlertService
	) {
		this.currentUserSubscription = userService.get()
			.subscribe(response => {
				this.currentUser = response.User;
			});
	}

	ngOnInit(): void {
		this.loadAllUsers();
	}

	ngOnDestroy(): void {
		this.currentUserSubscription.unsubscribe();
	}

	deleteUser(id: string): void {
		this.userService.delete(id)
			.subscribe(response => {
				this.alertService.success(response.Message);
				this.loadAllUsers();
			}, error => {
				this.alertService.error(error.error.Message);
			});
	}

	private loadAllUsers(): void {
		this.userService.getAll().pipe(first())
			.subscribe(response => {
				this.users = response.Users;
			});
	}
}
