import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new Subject<User>();
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7WhQnpMafThXZaqCa7zZu2xT5FUm8RcM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7WhQnpMafThXZaqCa7zZu2xT5FUm8RcM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap(resData => {
                console.log('login');
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        console.log('handle auth');
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(email, userId, token, expirationDate);
        console.log(user);
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log('handle error');
        let errorMessage = 'An unknown error occurred';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;   
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist' 
                break;            
        }
        return throwError(errorMessage);
    }
}
"auth != null"