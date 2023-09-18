import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions'
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        return (AuthActions.authenticateSuccess({
            email: email, 
            userId: userId, 
            token: token, 
            expirationDate: expirationDate}));    
}

const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred';
        if(!errorRes.error || !errorRes.error.error) {
            return of(AuthActions.authenticateFail({errorMessage: errorMessage}));
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
        return of(AuthActions.authenticateFail({errorMessage: errorMessage}));
}

@Injectable()
export class AuthEffects {
    authSignUp$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.signUpStart),
            switchMap(action => {
                return this.http.post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                    {
                        email: action.email,
                        password: action.password,
                        returnSecureToken: true
                    }).pipe(
                        map(resData => {
                            return handleAuthentication(
                                resData.email, 
                                resData.localId, 
                                resData.idToken, 
                                +resData.expiresIn)
                        }),
                        catchError(errorRes => {
                            return handleError(errorRes);
                        }), 
                    );
            })
        );
    });

    authLogin$ = createEffect(() => 
    {
        return this.actions$.pipe(
            ofType(AuthActions.loginStart),
            switchMap(action => {
                return this.http.post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                    {
                        email: action.email,
                        password: action.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    map(resData => {
                        return handleAuthentication(
                            resData.email, 
                            resData.localId, 
                            resData.idToken, 
                            +resData.expiresIn)
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    }), 
                );                    
            })
        )
    });

    authSuccess$ = createEffect(() => {
        return this.actions$.pipe(ofType(AuthActions.authenticateSuccess, AuthActions.logout),
        tap(() => {
            this.router.navigate(['/']);
        })
        );
    }, { dispatch: false });

    constructor(private actions$: Actions, private http: HttpClient, 
        private router: Router) {}

}
