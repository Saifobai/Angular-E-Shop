import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | Product[]
  productDeletedMessage: string | undefined

  constructor(
    private product: ProductService
  ) {

  }

  ngOnInit(): void {
    this.List()
  }

  onDeleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {

      if (result) {
        this.productDeletedMessage = 'Prodcut is deleted ';
        this.List()
      }

      setTimeout(() => {
        this.productDeletedMessage = undefined
      }, 3000)
    })
  }

  List() {
    this.product.productList().subscribe((result) => {
      //@ts-ignore
      this.productList = result
    })
  }
}
