import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cart: any[] = [];

  addToCart(item: any): void {
    this.cart.push(item);
  }
}
