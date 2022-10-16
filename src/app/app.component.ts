import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  router: string;
  title = 'ZeeWeeSoft-Admin';
  constructor(private _router: Router){
    if(localStorage.getItem('userLoggedIn')){
      let user = JSON.parse(localStorage.getItem('userLoggedIn') || "")
      // _router.navigate(['/home'])

    }

    this.router = _router.url;
    // console.log(this.router)
  }
}
