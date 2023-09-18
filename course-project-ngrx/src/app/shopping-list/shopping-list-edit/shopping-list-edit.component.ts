import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.actions';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode = false;
  editedItem!: Ingredient;
  @ViewChild('f') shopListForm!: NgForm;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient as Ingredient;
        this.shopListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(shoppingListActions.stopEdit());
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.store.dispatch(shoppingListActions.updateIngredient({ingredient: newIngredient}));
    } else {
      this.store.dispatch(shoppingListActions.addIngredient({ingredient: newIngredient}));
    }
    this.onCancel();
  }

  onDelete() {
    this.store.dispatch(shoppingListActions.deleteIngredient())
    this.onCancel();
  }

  onCancel() {
    this.shopListForm.reset();
    this.editMode = false;
    this.store.dispatch(shoppingListActions.stopEdit());
  }

}
