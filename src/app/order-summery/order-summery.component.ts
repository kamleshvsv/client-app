import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summery',
  templateUrl: './order-summery.component.html',
  styleUrls: ['./order-summery.component.scss']
})
export class OrderSummeryComponent implements OnInit {
  userData:any={}
  carList : any = []
  totalValue  = 0 
  constructor(private _router : Router, private toaster : ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userLoggedIn')){
      let user = JSON.parse(localStorage.getItem('userLoggedIn') || "")
      this.userData = user;
      console.log(this.userData)
      // _router.navigate(['/home'])

    }
    if(localStorage.getItem('cart')){
      let data = JSON.parse(localStorage.getItem('cart') || "")
      this.carList = data;
      console.log(this.carList)
      this.totalAmount()
      // _router.navigate(['/home'])

    }
  }

  totalAmount () { 
    const sum = this.carList.reduce((accumulator:any, object:any) => {
      console.log(accumulator, object)
      return accumulator + object.totalPrice;
    }, 0);
    console.log(sum)
    this.totalValue = sum;
    
  }
  checkout(){
    console.log("work")
    let emptyArr :any = []
    let orderdata = {
      orderDetails : this.carList,
      user : this.userData,
      totalAmount  : this.totalValue,
      orderDate : new Date()
    }
    console.log(orderdata)
    this.toaster.success("Order Placed Succesfull", "success")
    localStorage.setItem('orderhistory', JSON.stringify(orderdata))
    localStorage.setItem('cart', JSON.stringify(emptyArr))
    this._router.navigate(['/order-list'])
    // localStorage
  }

}
