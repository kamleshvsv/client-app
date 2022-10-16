import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList :any = []
  totalValue  = 0 
  constructor(private router :Router) { 
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('cart')){
      var data = JSON.parse(localStorage.getItem('cart') || "")
      console.log(data)
      this.cartList = data;
      this.totalAmount()
    }
  }

  totalAmount () { 
    const sum = this.cartList.reduce((accumulator:any, object:any) => {
      console.log(accumulator, object)
      return accumulator + object.totalPrice;
    }, 0);
    console.log(sum)
    this.totalValue = sum;
    
  }


  //brow
  browseProduct(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
  }); 
  }

}
