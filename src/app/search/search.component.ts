import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchResult: any

  constructor(
    private actviveRoute: ActivatedRoute,
    private product: ProductService
  ) { }

  ngOnInit(): void {
    let query = this.actviveRoute.snapshot.paramMap.get('query')
    console.log(query)
    query && this.product.filterToProducts(query).subscribe((result) => {
      this.searchResult = result
    })
  }
}
