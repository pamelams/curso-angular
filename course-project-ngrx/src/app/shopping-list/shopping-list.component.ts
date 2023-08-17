import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/shopping-list.reducer';
import { startEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients$!: Observable<{ingredients: Ingredient[]}>;
  private subscription!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   () => {
    //     this.ingredients = this.shoppingListService.getIngredients();
    //   }
    // );
  }

  onEditItem(index: number) {
    this.store.dispatch(startEdit({index: index}));
    //this.shoppingListService.startedEditing.next(index);
  }

}
