import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { startEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients$!: Observable<{ingredients: Ingredient[]}>;
  private subscription?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(startEdit({index: index}));
  }

}
