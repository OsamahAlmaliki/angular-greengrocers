import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent {
  groceries: Item[] = [];
  cart: Item[] = [];
  filteredItems: Item[] = [];

  @Output() addItem: EventEmitter<Item> = new EventEmitter<Item>();

  constructor(private http: HttpClient) {
    this.fetchGroceries();
  }

  fetchGroceries(): void {
    this.http
      .get<any[]>('https://boolean-api-server.fly.dev/groceries')
      .subscribe(
        (data) => {
          this.groceries = data;
          this.filteredItems = [...this.groceries];
        },
        (error) => {
          console.error('Error fetching groceries:', error);
        }
      );
  }

  addToCart(item: Item): void {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { ...item, quantity: 1 };
      this.cart.push(newItem);
      this.addItem.emit(newItem);
    }

    this.cart = this.cart.filter((cartItem) => cartItem.quantity > 0);
  }

  filterByType(type: string): void {
    this.filteredItems = this.groceries.filter((item) => item.type === type);
  }

  sortByPrice(): void {
    this.filteredItems = this.filteredItems.sort((a, b) => a.price - b.price);
  }

  sortByName(): void {
    this.filteredItems = this.filteredItems.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  resetFilters(): void {
    this.filteredItems = [...this.groceries];
  }
}
