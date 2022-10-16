import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  singleProductData : any = {}
  counter = 1;
  userData :any = {}
  // private sub = this._router.events
  //   .pipe(
  //     filter(event => event instanceof NavigationStart),
  //     map(event => event as NavigationStart),  
  //     filter(event => event.url !== '/single-product')
  //   )
  //   .subscribe(
  //     event => {this.getSingleProduct() } 
  //   );
  constructor(private toastr: ToastrService, private _router : Router, private activeRoute: ActivatedRoute) { 
 

    if(localStorage.getItem('userLoggedIn')){
      let user = JSON.parse(localStorage.getItem('userLoggedIn') || "")
      this.userData = user;
      console.log(this.userData)
      // _router.navigate(['/home'])

    }
  }

  ngOnInit(): void {
    this.getSingleProduct()
    // this.activeRoute.queryParams.subscribe(queryParams => {
    //   console.log("dddd", queryParams)
    //   alert("hello")
    //   // do something with the query params
    // });
  
    // const queryParams = this.activeRoute.snapshot.queryParams
    //     const routeParams = this.activeRoute.snapshot.params;
    //     console.log(queryParams, "and", routeParams)
    //     alert("hello")
  }

  getSingleProduct(){
    if(localStorage.getItem('single-product')){
      let data = JSON.parse(localStorage.getItem('single-product') || "")
      this.singleProductData = data
      console.log(this.singleProductData, "update")
      // console.log(this.singleProductData)
    }
  }

  onIncrement(): void {
    this.counter ++;
    }
   
    onDecrement(): void {
      if(this.counter == 1){
        return
      }
      this.counter --;
    }


    //addToCart
    addToCart(qty:any , data:any) {

      if(localStorage.getItem('cart')) {
        let arr = JSON.parse(localStorage.getItem('cart') || "")
        console.log(arr)
        
        let exist =  arr.find((x:any) => x.id == data.id);
        console.log(exist)
        if(exist === undefined){
          data.totalPrice = qty * data.price
          data.orderDate = new Date()
          data.customerName = this.userData.firstName  + " " + this.userData.lastName,
          data.customerEmail = this.userData.email,
          arr.push(data)
          localStorage.setItem('cart', JSON.stringify(arr))
          this.toastr.success("Product add succesfully", "Success")
          this._router.navigate(['/cart'])
        }else{
          this.toastr.warning("Product already exist", "Warning")
          this._router.navigate(['/cart'])
        }
      } else {
        let firstArr = []
        data.totalPrice = qty * data.price
        data.orderDate = new Date()
        data.customerName = this.userData.firstName + " " + this.userData.lastName,
        data.customerEmail = this.userData.email,
        firstArr.push(data)
        localStorage.setItem('cart', JSON.stringify(firstArr))
        this.toastr.success("Product add succesfully", "Success")
        this._router.navigate(['/cart'])
      }
   
    }

    // ngOnDestroy() {
    //   console.log('>> STOP listening to events for DetailsComponent');
    //   this.sub.unsubscribe();
    // }
}
