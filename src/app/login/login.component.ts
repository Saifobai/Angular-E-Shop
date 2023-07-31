import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authError: string = '';
  constructor(
    private seller: SellerService
  ) {

  }

  ngOnInit(): void {


  }

  loginUser(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.authError = ''
    this.seller.userLogIn(form)
    this.seller.isLoginFaild.subscribe((err) => {
      if (err) {
        this.authError = 'user email or password incorrect';
      }
    })

  }


}
