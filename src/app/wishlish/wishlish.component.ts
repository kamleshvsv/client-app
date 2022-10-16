import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-wishlish',
  templateUrl: './wishlish.component.html',
  styleUrls: ['./wishlish.component.scss']
})
export class WishlishComponent implements OnInit {
  wishlistProduct :any = []
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  constructor(private _router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('products')){
      let wishArr = []
      let data = JSON.parse(localStorage.getItem('products') || "")
      for(let i = 0; i < data.length; i++){
        if(data[i] && data[i].wishlist === true){
          wishArr.push(data[i])
        }
      }
      localStorage.setItem('wishlist', JSON.stringify(wishArr))
      this.wishlistProduct = wishArr

    }
  }

  goToSinglePage(data:any) {
    localStorage.setItem('single-product', JSON.stringify(data))
    this._router.navigate(['/single-product/' + data.title]).then(()=>{
      window.location.reload()
    });

  }

}
