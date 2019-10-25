import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import User from '../../models/user/user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private controller: string = 'user';
	private _baseUrl: string;

	constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
		this._baseUrl = `${baseUrl}${this.controller}`;
	}

	getAll(token: string): Observable<Array<User>> {
		return this.http.get<Array<User>>(`${this._baseUrl}/all`);
	}
}
