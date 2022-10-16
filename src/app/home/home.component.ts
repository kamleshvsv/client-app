import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products : any = []
  userData :any = {}
  counter = 1;
  constructor(private _router : Router, private toastr : ToastrService) {
   
   }

  ngOnInit(): void {
    if(localStorage.getItem('products')){
      let data = JSON.parse(localStorage.getItem('products') || "")
      var finalaize = data.map((res:any) => {
        res['counter'] = 1;
        return res
     });
     console.log(finalaize)
      this.products = finalaize;
      // console.log(this.products)

    }
    if(localStorage.getItem('userLoggedIn')){
      let user = JSON.parse(localStorage.getItem('userLoggedIn') || "")
      this.userData = user;
      console.log(this.userData)
      // _router.navigate(['/home'])

    }
  }

  onIncrement(index:any, qty:any): void {
    if(this.products[index].counter === qty){ 
      console.log("work")
      alert("Sorry !! you can not order more then" + " " + this.products[index].counter  + " " + "quantity")
      return
    }else{
      console.log("increment")
      this.products[index].counter += 1;
    }
    }

    onDecrement(index:any): void {
      if(this.products[index].counter === 1){
        return
      }
      this.products[index].counter -= 1;
      }

    goToSinglePage(data:any) {
      localStorage.setItem('single-product', JSON.stringify(data))
      // this._router.navigate('/single-product/' + `${data.title}`)
    }

    addToWishlist(data:any){
      if(localStorage.getItem('wishlist')) {
        let arr = JSON.parse(localStorage.getItem('wishlist') || "")
        console.log(arr)
        
        let exist =  arr.find((x:any) => x.id == data.id);
        console.log(exist)
        if(exist === undefined){
          let productArray = []
          // data.totalPrice = qty * data.price
          data.date = new Date()
          data.customerName = this.userData.firstName  + " " + this.userData.lastName,
          data.customerEmail = this.userData.email,
          arr.push(data)
          for (let i = 0; i < this.products.length; i++) {
            var obj = this.products[i];
            if(obj.id === data.id){
              obj.wishlist = true;
            }
            console.log(obj)
            productArray.push(obj)
          }
          if(productArray.length > 0){
            localStorage.setItem('products', JSON.stringify(productArray))
          }
          localStorage.setItem('wishlist', JSON.stringify(arr))
          this.toastr.success("Product add succesfully", "Success")
        }else{
          let productArrayRemove = []
          for (let i = 0; i < this.products.length; i++) {
            var obj = this.products[i];
            if(obj.id === data.id){
              obj.wishlist = false;
            }
            console.log(obj)
            productArrayRemove.push(obj)
            console.log(productArrayRemove)
          }
          if(productArrayRemove.length > 0){
            localStorage.setItem('products', JSON.stringify(productArrayRemove))
          }
          this.toastr.warning("Remove from wishlist", "success")
          // this._router.navigate(['/wishlist'])
        }
      } else {
        let firstArr = []
        let productArr = []
        // data.totalPrice = qty * data.price
        data.date = new Date()
        data.customerName = this.userData.firstName + " " + this.userData.lastName,
        data.customerEmail = this.userData.email,
        firstArr.push(data)
        for (let i = 0; i < this.products.length; i++) {
          var obj = this.products[i];
          if(obj.id === data.id){
            obj.wishlist = true;
          }
          console.log(obj)
          productArr.push(obj)
        }
        if(productArr.length > 0){
          localStorage.setItem('products', JSON.stringify(productArr))
        }
  
        localStorage.setItem('wishlist', JSON.stringify(firstArr))
        this.toastr.success("Product add succesfully", "Success")
      }
    }


        //addToCart
        addToCart(qty:any , data:any) {
          console.log(qty, data)

          if(localStorage.getItem('cart')) {
            let arr = JSON.parse(localStorage.getItem('cart') || "")
            console.log(arr, "this")
            
            let exist =  arr.find((x:any) => x.id == data.id);
            console.log(exist,"this")
            if(exist === undefined){
              data.totalPrice = qty * data.price
              data.orderDate = new Date()
              data.customerName = this.userData.firstName  + " " + this.userData.lastName,
              data.customerEmail = this.userData.email,
              arr.push(data)
              console.log(arr)
              localStorage.setItem('cart', JSON.stringify(arr))
              this.toastr.success("Product add succesfully", "Success")
              this._router.navigate(['/cart'])
            }else{
              this.toastr.warning("Product already exist", "Warning")
              // this._router.navigate(['/cart'])
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
    

}
