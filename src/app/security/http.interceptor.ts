import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class Interceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const clonedRequest = req.clone({
			headers: req.headers.set('token', sessionStorage.getItem('token'))
		});

		return next.handle(clonedRequest);
	}
}
