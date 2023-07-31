import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default'
  sellerName: string = ''
  searchFilterResulte: any
  userName: string = ''
  isLoggedIn: boolean = false;
  cartItems = 0


  constructor(private router: Router, private product: ProductService) {

  }

  ngOnInit(): void {

    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStored = localStorage.getItem('seller')
          let sellerData = sellerStored && JSON.parse(sellerStored)[0]
          this.sellerName = sellerData.name
          this.menuType = 'seller'
          // this.isLoggedIn = true; // Set isLoggedIn to true for the seller
        } else if (localStorage.getItem('user')) {
          let userStored = localStorage.getItem('user')
          let userData = userStored && JSON.parse(userStored)
          this.userName = userData.name
          this.menuType = 'user'
          this.product.getCartListData(userData.id)
          // this.isLoggedIn = true; // Set isLoggedIn to true for the user
        } else {
          this.menuType = 'default'
          // this.isLoggedIn = false; // Set isLoggedIn to false for the default case
        }
      }
    });

    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length
    })


  }

  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }


  searchProdcuts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.product.filterToProducts(element.value).subscribe((result) => {
        if (result['length'] > 5) {
          result['length'] = 5
        }
        this.searchFilterResulte = result
      })
    }
  }

  hideSearch() {
    this.searchFilterResulte = undefined
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id])
  }

  searchInputSubmit(value: string) {
    console.log(value)
    this.router.navigate([`search/${value}`])
  }



}
