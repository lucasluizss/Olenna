import { Router } from '@angular/router';
import { UserService } from './../user/user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import User from 'src/app/models/user/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService implements OnInit {

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
	private _baseUrl: string;

	constructor(
		private router: Router,
		private http: HttpClient,
		private _userService: UserService,
		@Inject('BASE_URL') baseUrl: string
	) {
		this._baseUrl = `${baseUrl}`;
	}

	async ngOnInit(): Promise<void> {
		const user = await this._userService.get().toPromise();

		if (user) {
			this.currentUserSubject = new BehaviorSubject<User>(user);
			this.currentUser = this.currentUserSubject.asObservable();
			this.router.navigate(['/']);
		} else {
			localStorage.clear();
			sessionStorage.clear();
		}
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	public login(email: string, password: string): any {
		return this.http.post<any>(`${this._baseUrl}/login`, { email, password })
			.pipe(map(response => {
				if (response && response.Token) {
					sessionStorage.setItem('token', response.Token);
					this.currentUserSubject.next(response);
				}

				return response;
			}));
	}

	public async logout(): Promise<void> {
		await this.http.post(`${this._baseUrl}/logout`, {}).toPromise();
		sessionStorage.removeItem('token');
		this.currentUserSubject.next(null);
	}

	public info(): Observable<any> {
		return this.http.post(`${this._baseUrl}/info`, {});
	}
}
