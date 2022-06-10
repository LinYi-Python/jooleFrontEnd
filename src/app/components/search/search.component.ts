import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import {Router} from '@angular/router';

import {Product} from '../../models/product';
import {AuthService} from '../../services/auth.service';
import {HomeService} from '../../services/home.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isAuthenticated = false;
  products: Product[];
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;

  constructor(private httpClient: HttpClient, private router: Router,public homeService: HomeService, public authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    console.log(this.isAuthenticated);
  }

  unique(arr: any[]){
    const unique = {};
    // tslint:disable-next-line:only-arrow-functions
    arr.forEach(function(product: any){
      // @ts-ignore
      unique[JSON.stringify(product)] = product;
    });
    // tslint:disable-next-line:only-arrow-functions
    arr = Object.keys(unique).map(function(u){
      return JSON.parse(u);
    });
    return arr;
  }

  search(value: string): void {
    this.httpClient
      .get<[Product]>(`http://localhost:8081/joole/ProductController/getAllProductFromProductType?productType=${value}`)
      .subscribe(data => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        console.log(data);
        data.forEach(item => {
          console.log(Object.keys(item), Object.values(item));
          listOfOption.push({
            value: Object.values(item)[2],
            text:  Object.values(item)[2]
          });
          this.products = data;
        });
        const set = new Set(listOfOption);
        console.log(listOfOption);
        this.listOfOption = this.unique(listOfOption);
      });
  }

  toHomePage(){
    this.router.navigate(['/detail']);
    console.log(this.products);
    console.log(this.selectedValue);
    this.homeService.products = this.products;
    // @ts-ignore
    this.homeService.searchItem = this.selectedValue;
  }
}
