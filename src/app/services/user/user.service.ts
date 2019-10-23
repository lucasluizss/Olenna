import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import User from '../../models/user/user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private controller: string = 'User';

	@Inject('BASE_URL') baseUrl: string;

	constructor(private http: HttpClient) { }

	getAll(): Observable<Array<User>> {
		return this.http.get<Array<User>>(`${this.baseUrl}${this.controller}/GetAll`);
	}
}
