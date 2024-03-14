import { Component, Input } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css'],
})
export class TotalComponent {
  @Input() cart: Item[] = [];

  constructor() {}

  getTotalPrice(): number {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
