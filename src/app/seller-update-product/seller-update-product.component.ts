import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  updateProductMessage: string | undefined
  productData: undefined | Product

  constructor(
    private product: ProductService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {

    let productId = this.route.snapshot.paramMap.get('id');

    productId && this.product.getProduct(productId).subscribe((data) => {

      this.productData = data
    })

  }


  onUpdateProduct(data: Product) {

    if (this.productData) {
      data.id = this.productData.id
    }

    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateProductMessage = 'Product updated successfully'
      }
      setTimeout(() => {
        this.updateProductMessage = undefined;
      }, 3000)
    })

  }
}
