import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
@Injectable()
export class CommonHttpInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers: any;
        if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).data) {
            headers = new HttpHeaders().set('x-access-token', JSON.parse(localStorage.getItem('userInfo')).data.accessToken);
        }
        const customReq = request.clone({
            withCredentials: true,
            headers: headers
        });
        return next.handle(customReq);
    }
}
