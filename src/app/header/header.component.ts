import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categoryData :any = []
  userData : any = {}

  constructor(private _router : Router) { 

    if(localStorage.getItem('userLoggedIn')){
      let user = JSON.parse(localStorage.getItem('userLoggedIn') || "")
      this.userData = user;

    }

    if(localStorage.getItem('categories')){
      let data = JSON.parse(localStorage.getItem('categories') || "")
      console.log("data", data)
      this.categoryData = data;
    }
  }

  ngOnInit(): void {
  }

  logOut () {
    console.log("logout")
    localStorage.removeItem('userLoggedIn')
    this._router.navigate(['/']).then(()=> {
      window.location.reload()
    })
  }

}
