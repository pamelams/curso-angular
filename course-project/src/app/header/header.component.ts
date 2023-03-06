import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    collapsed = true;
    @Output() page = new EventEmitter<string>()

    onShoppingList() {
        this.page.emit('shopping-list');
    }

    onRecipes() {
        this.page.emit('recipes');
    }
}