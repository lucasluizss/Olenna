import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

//#region Services
import { AlertService } from 'src/app/services/shared/alert.service';
import { UserService } from './../../../services/user/user.service';
import { AuthService } from './../../../services/auth/auth.service';
//#endregion

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

	registerForm: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private authenticationService: AuthService,
		private userService: UserService,
		private alertService: AlertService
	) {
		// if (this.authenticationService.currentUserValue) {
		// 	this.router.navigate(['/']);
		// }
	}

	ngOnInit(): void {
		this.registerForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			birthDate: ['', Validators.required],
			phone: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	get f(): any { return this.registerForm.controls; }

	onSubmit(): void {
		this.submitted = true;

		if (this.registerForm.invalid) {
			return;
		}

		this.loading = true;
		this.userService.register(this.registerForm.value)
			.pipe(first())
			.subscribe(data => {
				this.alertService.success('Registration successful', true);
				// this.router.navigate(['/login']);
			}, error => {
				this.alertService.error(error.error.Message);
				this.loading = false;
			});
	}
}
