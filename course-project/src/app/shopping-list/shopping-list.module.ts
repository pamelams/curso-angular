import { NgModule } from "@angular/core";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent,
    ],
    imports: [
        RouterModule.forChild([
            { path: 'shopping-list' , component: ShoppingListComponent }
        ]),
        SharedModule,
        FormsModule,
    ]
})
export class ShoppingListModule {

}