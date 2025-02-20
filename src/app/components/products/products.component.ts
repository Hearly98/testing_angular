import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  providers: [ProductsService, ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: Product[] = []

  constructor(
      private productService: ProductsService
    ){
    }

    ngOnInit(): void {
      this.getAllProducts();
    }

    getAllProducts(){
      this.productService.getAllSimple()
      .subscribe(
        products => {
          this.products = products
        }
      )
    }
}
