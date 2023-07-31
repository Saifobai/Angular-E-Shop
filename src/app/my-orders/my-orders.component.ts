import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {


  orderData: Order[]

  constructor(
    private product: ProductService
  ) { }

  ngOnInit(): void {
    this.getOrderList()
  }

  cancelOrder(orderId: number) {

    orderId && this.product.cancelOrder(orderId).subscribe((result) => {

      this.getOrderList()
    })

  }

  getOrderList() {
    this.product.orderListItems().subscribe((result) => {
      this.orderData = result
    })
  }

}
