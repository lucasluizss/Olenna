import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import User from '../../models/user/user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private _baseUrl: string;
	private controller: string = '/user';

	constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
		this._baseUrl = `${baseUrl}${this.controller}`;
	}

	get(): Observable<any> {
		return this.http.get<User>(`${this._baseUrl}/get`);
	}

	getAll(): Observable<any> {
		return this.http.get<Array<User>>(`${this._baseUrl}/all`);
	}

	register(request: User): Observable<User> {
		return this.http.post<User>(`${this._baseUrl}/new`, request);
	}

	delete(id: number): Observable<Array<User>> {
		throw new Error('Method not implemented.');
	}
}
