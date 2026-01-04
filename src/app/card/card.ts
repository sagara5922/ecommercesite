import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  // repeat= Array.from({length:6});
  products: any[] = [];
  constructor(private service: Service, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.service.getProducts().subscribe({
      next: (data: any) => {
        console.log('API Data:', data);
        if (data && data.products) {
          this.products = data.products;
          console.log('Products assigned:', this.products);
        } else {
          console.error('Data format incorrect:', data);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }
}
