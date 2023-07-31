import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(
    private seller: SellerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(form: NgForm) {


    this.seller.userSignUp(form)

  }

}
