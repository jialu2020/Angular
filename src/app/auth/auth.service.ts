import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {dateComparator} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";


export interface AuthResponseData{
  kind:string;
  idToken: string;
  email:string;
  refreshToken:string;
  expiresIn: string;
  localId:string;
  registered?:boolean;
  //response data format
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    //Subject（主题）是一种特殊类型的 Observable。
    // 它既可以作为可观察对象发出数据，也可以充当观察者订阅其他可观察对象。
    // Subject 具有多重角色，可以同时充当数据源和数据接收者。
    // 当你使用 Subject 时，它可以被多个观察者订阅，
    // 而 Observable 通常只能被单个观察者订阅。
    // token : string = null;
    // behaviorSubject 立刻发送值
    user = new BehaviorSubject<User>(null);



    private tokenTimer :any;

  constructor( private http : HttpClient ,
               private router : Router) { }


  signup(email:string,password:string){
    return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4hpXtrrJa6GwJQ_c6linszg4kK4FG5T0'
    ,{
            email : email,
            password: password ,
            returnSecureToken : true})
        .pipe(catchError(this.handleError),
        tap( resData => {
            this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn);

            }
        ));
  }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4hpXtrrJa6GwJQ_c6linszg4kK4FG5T0',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(

                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }


    logout(){
      this.user.next(null);
        this.router.navigate(['./auth']);
        //localStorage.clear();
        localStorage.removeItem('userData');
        if(this.tokenTimer){
            clearTimeout(this.tokenTimer);
        }
        this.tokenTimer = null;

    }

    autoLogout(expirationDuration : number){

        console.log('auto logout time left : ')
        console.log(expirationDuration)


      //expirationDuration 过期时间
      this.tokenTimer = setTimeout(()=>{
          this.logout();
      } , expirationDuration)


    }

    autoLogin(){
      const userData: {
          email:string;
          id:string;
          _token:string;
          _tokenExpirationDate: Date
      } = JSON.parse(localStorage.getItem('userData'));
      //localstorage 的value 是string 类型， 通过JSON parse 转换为json
      if(!userData){
          return;
      }
      const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
      )
        if(loadedUser.token){
            this.user.next(loadedUser);
            const timeOut = userData._tokenExpirationDate.getTime() - new Date().getTime()
            this.autoLogout(timeOut)


        }

    }






    private  handleAuthentication (email: string, userId: string, token : string , expiresIn: number){
        //handleAuthentication 方法的主要目的是在用户进行身份验证成功后，处理身份验证信息并创建用户对象

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user =
            new User(
                email ,
                userId,
                token,
                expirationDate);
        console.log('current user is : ')
        console.log(user)
        this.user.next(user);
        this.autoLogout( expiresIn * 1000)
        localStorage.setItem('userData' , JSON.stringify(user));
    }

  private handleError(errRes:HttpErrorResponse){
      let errorMessage = 'An unknow errer occured!';
      console.log(errRes)
      if(!errRes.error || !errRes.error.error){
          // throw error 抛出错误 告诉程序一个错误发生了
          return throwError(()=>{
              new Error(errorMessage);
              console.log('unknow error')
          });
      }

      switch (errRes.error.error.message){
          case 'EMAIL_EXISTS':
              errorMessage =  'this email exists already!';
              console.log(errRes)
              break;
          default:
              errorMessage = errRes.error.error.message;

      }
      return throwError(()=>new Error(errorMessage)

      );
  }
}
