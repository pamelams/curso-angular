import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map } from "rxjs/operators";
import * as RecipesActions from '../recipes/store/recipes.actions';
import * as AuthActions from '../auth/store/auth.actions'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    private userSub!: Subscription;
    isAuthenticated = false;

    constructor(private store: Store<AppState>) {

    }

    ngOnInit(): void {
        this.userSub = this.store.select('auth').pipe(map(authState => {
            return authState.user;
        })).subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        });
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        this.store.dispatch(RecipesActions.storeRecipes());
    }

    onFetchData() {
        this.store.dispatch(RecipesActions.fetchRecipes())
    }
     
    onLogout() {
        this.store.dispatch(AuthActions.logout());
    }
}