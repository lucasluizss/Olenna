import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import User from 'src/app/models/user/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
	private _baseUrl: string;

	constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
		this._baseUrl = `${baseUrl}`;
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	login(email: string, password: string): any {
		return this.http.post<any>(`${this._baseUrl}/login`, { email, password })
			.pipe(map(response => {
				if (response && response.Token) {
					localStorage.setItem('currentUser', JSON.stringify(response));
					sessionStorage.setItem('token', response.Token);
					this.currentUserSubject.next(response);
				}

				return response;
			}));
	}

	logout(): void {
		this.http.post(`${this._baseUrl}/logout`, {});
		localStorage.removeItem('currentUser');
		sessionStorage.removeItem('token');
		this.currentUserSubject.next(null);
	}

	info(): Observable<any> {
		return this.http.post(`${this._baseUrl}/info`, {});
	}
}
