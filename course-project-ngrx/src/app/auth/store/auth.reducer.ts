import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface AuthState {
    user: User | null;
    authError: string;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    authError: '',
    loading: false
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.authenticateSuccess, (state, action) => {
        const user = new User(action.email, action.userId, action.token, action.expirationDate);
        return {
            ...state, 
            user: user,
            authError: '',
            loading: false
        };
    }),
    on(AuthActions.logout, (state, action) => {
        return {
            ...state, 
            user: null
        };
    }),
    on(AuthActions.loginStart, AuthActions.signUpStart, (state, action) => {
        return {
            ...state,
            authError: '',
            loading: true
        }
    }),
    on(AuthActions.authenticateFail, (state, action) => {
        return {
            ...state,
            user: null,
            authError: action.errorMessage,
            loading: false
        }
    }),
    on(AuthActions.clearError, (state, action) => {
        return {
            ...state,
            authError: ''
        }
    })
);