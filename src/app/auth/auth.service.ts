import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";


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
    user = new BehaviorSubject<User>(null);
    //Subject（主题）是一种特殊类型的 Observable。
    // 它既可以作为可观察对象发出数据，也可以充当观察者订阅其他可观察对象。
    // Subject 具有多重角色，可以同时充当数据源和数据接收者。
    // 当你使用 Subject 时，它可以被多个观察者订阅，
    // 而 Observable 通常只能被单个观察者订阅。
    // token : string = null;
    // behaviorSubject 立刻发送值

  constructor( private http : HttpClient) { }


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


    private  handleAuthentication (email: string, userId: string, token : string , expiresIn: number){
        //handleAuthentication 方法的主要目的是在用户进行身份验证成功后，处理身份验证信息并创建用户对象

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user =
            new User(
                email ,
                userId,
                token,
                expirationDate);
        console.log(user)
        this.user.next(user);
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
