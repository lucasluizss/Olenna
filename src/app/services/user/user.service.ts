import { catchError } from 'rxjs/operators';
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

	public get(): Observable<User> {
		return this.http.get<User>(`${this._baseUrl}/get`);
	}

	public getById(request: string): Observable<any> {
		return this.http.get<User>(`${this._baseUrl}/get/${request}`);
	}

	public getAll(): Observable<any> {
		return this.http.get<Array<User>>(`${this._baseUrl}/all`);
	}

	public register(request: User): Observable<User> {
		return this.http.post<User>(`${this._baseUrl}/new`, request);
	}

	public edit(request: User): Observable<User> {
		return this.http.post<User>(`${this._baseUrl}/edit`, request);
	}

	public delete(request: string): Observable<any> {
		return this.http.delete<any>(`${this._baseUrl}/delete/${request}`);
	}
}
