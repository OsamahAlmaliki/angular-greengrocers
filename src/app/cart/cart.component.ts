import { Component, Input } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @Input() cart: Item[] = [];
  item: any;

  constructor() {}

  increaseQuantity(item: Item): void {
    item.quantity++;
  }

  decreaseQuantity(item: Item): void {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }
}
