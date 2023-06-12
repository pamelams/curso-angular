import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../shared/services/recipes.service';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    private userSub!: Subscription;
    isAuthenticated = false;

    constructor(private recipesService: RecipesService,
                private authService: AuthService) {

    }

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
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
            console.log(resData);
        }, (error) => {
            console.log(error);
        });
    }
     
    onLogout() {
        this.authService.logout();
    }
}