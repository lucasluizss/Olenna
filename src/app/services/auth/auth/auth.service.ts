import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _baseUrl: string;

	constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
		this._baseUrl = `${baseUrl}`;
	}

	login(email: string, password: string): Observable<any> {
		return this.http.post(`${this._baseUrl}/login`, { email, password });
	}

	logout(): Observable<any> {
		return this.http.post(`${this._baseUrl}/logout`, { });
	}

	info(): Observable<any> {
		return this.http.post(`${this._baseUrl}/info`, { });
	}
}
