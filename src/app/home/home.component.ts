import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: any[] = [];
  activeIndex = 0;

  constructor(private http: HttpClient) {}  // ✅ Must inject HttpClient

  ngOnInit(): void {
    // ✅ Use HttpClient instead of fetch() for Angular change detection
    this.http
      .get<any>('https://dummyjson.com/products?limit=6')
      .subscribe(res => {
        this.products = res.products;   // Assign products
        this.activeIndex = 0;           // Set first product
        this.startAutoSlide();          // Start carousel
      });
  }

  startAutoSlide() {
    setInterval(() => this.next(), 4000); // Auto-slide every 4s
  }

  next() {
    if (!this.products.length) return;
    this.activeIndex = (this.activeIndex + 1) % this.products.length;
  }

  prev() {
    if (!this.products.length) return;
    this.activeIndex =
      (this.activeIndex - 1 + this.products.length) % this.products.length;
  }

  goTo(i: number) {
    this.activeIndex = i;
  }

  get activeProduct() {
    return this.products[this.activeIndex];
  }
}
