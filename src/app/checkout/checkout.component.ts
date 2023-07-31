import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  totalPrice: number;
  cartData: Cart[]
  orderMessage: string

  constructor(
    private product: ProductService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.product.currentCartDetails().subscribe((result) => {


      let price = 0
      this.cartData = result
      result.forEach((item) => {
        if (item.quantity) {

          price = price + (+item.price * item.quantity)
        }
      });
      this.totalPrice = price + (price / 10) + 100 - (price / 10)

    })
  }

  orderNow(data: { email: string, address: string, contact: string }) {

    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id

    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId
      }

      this.cartData.forEach((item) => {

        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 700);
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {

          this.orderMessage = 'your order has been placed successfully'
          setTimeout(() => {
            this.router.navigate(['/orders'])
            this.orderMessage = undefined
          }, 4000);
        }
      })
    }
  }

}
