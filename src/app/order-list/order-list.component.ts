import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orderDataList :any = []
  totalValue  = 0 
  constructor(private router :Router, private toastr : ToastrService) { 
    
  }

  ngOnInit(): void {
    if(localStorage.getItem('orderhistory')){
      var data = JSON.parse(localStorage.getItem('orderhistory') || "")
      console.log(data)
      this.orderDataList = data;
      this.totalAmount()
    }
  }

  totalAmount () { 
    const sum = this.orderDataList.orderDetails.reduce((accumulator:any, object:any) => {
      console.log(accumulator, object)
      return accumulator + object.totalPrice;
    }, 0);
    console.log(sum)
    this.totalValue = sum;
  }

  cancelOrder(values:any){
    let cartBack :any = []
    if(localStorage.getItem('cart')){
      cartBack = JSON.parse(localStorage.getItem('cart') || "")
    }
   
    if (confirm('Are you sure you want to delete this' + values.title + "?")) {
      var final = this.orderDataList.orderDetails.filter(function( obj:any ) {
        if(obj.id === values.id){
          cartBack.push(obj)
          localStorage.setItem('cart', JSON.stringify(cartBack))
        }
        return obj.id !== values.id;
      });

      this.orderDataList.orderDetails = final;
      console.log(cartBack, "final", this.orderDataList);
      this.toastr.success("Cancel order succesfully","success")
      localStorage.setItem('orderhistory', JSON.stringify(this.orderDataList))
      this.router.navigate(['/cart'])
    } else {
      // Do nothing!
      console.log('Thing was not Delete.');
    }
    
  }


  //brow
  browseProduct(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
  }); 
  }

}