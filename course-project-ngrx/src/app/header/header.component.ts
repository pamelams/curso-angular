import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { map } from "rxjs/operators";
import * as AuthActions from '../auth/store/auth.actions' 

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    private userSub!: Subscription;
    isAuthenticated = false;

    constructor(private recipesService: RecipesService,
                private authService: AuthService, private store: Store<AppState>) {

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
        this.recipesService.saveRecipes();
    }

    onFetchData() {
        this.recipesService.fetchRecipes().subscribe((resData) => {
        }, (error) => {
            console.log(error);
        });
    }
     
    onLogout() {
        this.store.dispatch(AuthActions.logout());
    }
}