import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment } from '../counter-store/counter.actions';
//import { DecrementAction, IncrementAction } from '../counter-store/counter.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
})
export class CounterControlsComponent {
  value = 1;
  constructor(private store: Store) {}

  increment() {
    this.store.dispatch(increment({ value: this.value }));
    //this.store.dispatch(new IncrementAction(this.value));
  }

  decrement() {
    this.store.dispatch(decrement({ value: this.value }));
    //this.store.dispatch(new DecrementAction(this.value));
  }
}
