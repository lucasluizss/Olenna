import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class Interceptor implements HttpInterceptor {

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const allowedUrls = ['login', 'new'];

		if (allowedUrls.includes(request.url.split('/').reverse()[0])) {
			return next.handle(request);
		}

		const clonedRequest = request.clone({
			setHeaders: {
				Authorization: sessionStorage.getItem('token')
			}
		});

		return next.handle(clonedRequest);
	}
}
