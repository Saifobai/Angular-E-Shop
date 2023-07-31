import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage: string | undefined

  constructor(
    private product: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onAddProduct(form: NgForm) {

    this.product.addProduct(form).subscribe((result) => {
      console.log(result)
      if (result) {
        this.addProductMessage = 'Product added successfully';

        setTimeout(() => {
          this.router.navigate(['/'])
        }, 1000);
      }
      else {
        setTimeout(() => this.addProductMessage = undefined, 3000)
      }
    })
  }

}
