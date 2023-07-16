import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    //是的，拦截器是在发出HTTP请求之前执行的。
    // 当您使用HttpClient发送HTTP请求时，Angular会在请求发送之前调用已注册的拦截器的intercept方法。
    //
    // 拦截器的执行顺序是根据它们在providers数组中的注册顺序决定的。
    // 首先注册的拦截器将首先执行，最后注册的拦截器将最后执行。
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}
