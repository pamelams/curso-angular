import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.ingredientsChanged.subscribe(
      () => {
        this.ingredients = this.shoppingListService.getIngredients();
      }
    )
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

}
