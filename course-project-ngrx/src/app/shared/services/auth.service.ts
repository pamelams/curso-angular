import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import * as AuthActions from "src/app/auth/store/auth.actions";

@Injectable({providedIn: 'root'})
export class AuthService {
    private tokenExpirationTimer: any;

    constructor(private store: Store<AppState>) {}
    
    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(AuthActions.logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }
}