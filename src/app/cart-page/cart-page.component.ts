import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, PriceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData: Cart[]
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(
    private product: ProductService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loadDetails();
  }

  removeToCart(cartId: number) {

    cartId && this.cartData &&
      this.product
        .removeTocart(cartId)
        .subscribe((result) => {
          this.loadDetails()
        });

  }


  loadDetails() {
    this.product.currentCartDetails().subscribe((result) => {

      this.cartData = result
      let price = 0
      result.forEach((item) => {
        if (item.quantity) {

          price = price + (+item.price * item.quantity)
        }
      });
      this.priceSummary.price = price
      this.priceSummary.discount = price / 10
      this.priceSummary.tax = price / 10
      this.priceSummary.delivery = 60
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10)
      if (!this.cartData.length) {
        this.router.navigate(['/']);
      }
    });
  }

  checkOut() {

    this.router.navigate(['/checkout']);
  }

}
