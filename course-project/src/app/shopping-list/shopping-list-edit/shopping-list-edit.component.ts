import { Component } from '@angular/core';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

  constructor(private shoppingListService: ShoppingListService) {}

  onAddIngredient(form: NgForm) {
    const value = form.value;
    this.shoppingListService.addIngredient(value.name, value.amount);
  }

}
