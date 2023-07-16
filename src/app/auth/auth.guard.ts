import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {take} from "rxjs/operators";
@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate{

    constructor(private as : AuthService,
                private router : Router) {
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        Observable<boolean | UrlTree > | Promise<boolean | UrlTree> | boolean | UrlTree{

        return this.as.user.pipe(
            take(1),
            //只订阅一次
            map(
            user =>{
                const isAuth = !!user;
                // 是否验证 和是否存在 已验证的user相关
                if(isAuth){
                    return isAuth;
                    //已验证， 返回true
                }
                return this.router.createUrlTree(['/auth'])
                //否则重定向到 登录页面
            }
        ) )
    }


    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //     let isAuthenticated = false;
    //
    //     this.as.user.subscribe(user => {
    //         isAuthenticated = !!user;
    //     });
    //
    //     return isAuthenticated;
    // }



}
