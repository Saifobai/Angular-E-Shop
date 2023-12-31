import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<Product[] | []>();

  constructor(
    private http: HttpClient
  ) { }


  addProduct(data: any) {
    return this.http.post(`http://localhost:3000/products`, data)
  }

  productList() {
    return this.http.get(`http://localhost:3000/products`)
  }


  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }



  getProduct(id: string) {
    return this.http.get<any>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`, product)
  }

  popularProducts() {
    return this.http.get<Product>(`http://localhost:3000/products?_limit=4`)
  }

  latestProducts() {

    return this.http.get<Product>(`http://localhost:3000/products?_limit=8`)
  }

  filterToProducts(query: string) {

    return this.http.get<Product>(`http://localhost:3000/products?q=${query}`)
  }


  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data])
    }
    else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
      this.cartData.emit(cartData)

    }
  }

  removItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: Product[] = JSON.parse(cartData)
      items = items.filter((item: Product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items)
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post(`http://localhost:3000/cart`, cartData)
  }


  getCartListData(userId: number) {
    return this.http.get<Product[]>(`http://localhost:3000/cart?userId=` + userId,
      { observe: 'response' })
      .subscribe((result) => {
        console.log(result)
        if (result && result.body) {

          this.cartData.emit(result.body)
        }
      })
  }

  removeTocart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/` + cartId)
  }


  currentCartDetails() {
    let userStored = localStorage.getItem('user')
    let userData = userStored && JSON.parse(userStored)
    return this.http.get<Cart[]>(`http://localhost:3000/cart?userId` + userData.id);

  }

  orderNow(data: Order) {
    return this.http.post(`http://localhost:3000/orders`, data)
  }

  orderListItems() {
    let userStored = localStorage.getItem('user')
    let userData = userStored && JSON.parse(userStored)
    return this.http.get<Order[]>(`http://localhost:3000/orders?userId=` + userData.id)
  }

  deleteCartItems(cartId: number) {

    return this.http.delete(`http://localhost:3000/cart/` + cartId
      , { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.cartData.emit([])
        }
      })

  }

  cancelOrder(orderId: number) {
    return this.http.delete(`http://localhost:3000/orders/` + orderId)
  }


}
