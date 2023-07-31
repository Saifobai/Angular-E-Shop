import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Cart, Product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogIn: boolean = true
  authError: string = ""

  constructor(
    private userService: UserService,
    private product: ProductService
  ) { }

  ngOnInit(): void {
    this.userService.userAuthReload()
  }

  signUp(form: NgForm) {
    this.userService.userSignUp(form)
  }

  logIn(form: SignUp) {
    this.userService.userLogIn(form)
    this.userService.inValidUserAuth.subscribe((result) => {

      if (result) {
        this.authError = 'User not found'
      } else {
        this.localCartToRemoteCart()

      }
    })
  }

  openSignUp() {
    this.showLogIn = false;
  }

  openLogIn() {
    this.showLogIn = true;
  }

  localCartToRemoteCart() {

    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse('user').id
    if (data) {
      let cartDataList: Product[] = JSON.parse(data)
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id
        setTimeout(() => {

          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('cart data stored successfully')
            }
          })
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')
          }
        }, 2000);
      })
    }

    setTimeout(() => {
      this.product.getCartListData(userId)
    }, 2000);
  }

}
