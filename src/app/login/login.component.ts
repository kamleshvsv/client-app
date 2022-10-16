import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  existUser :any = []
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private _router:Router, private toater :ToastrService) {
    if(localStorage.getItem('users')){
      let users = JSON.parse(localStorage.getItem('users') || "")
      console.log(users)
      this.existUser = users;
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem('userLoggedIn')){
      let user = JSON.parse(localStorage.getItem('userLoggedIn') || "")
      this._router.navigate(['/home'])

    }
    this.form = this.formBuilder.group(
      {
       
        email: ['', [Validators.required, Validators.email]],
        password: ['',[Validators.required]]
      }
    );
  }


  get f():{[key :string] : AbstractControl} {
    return this.form.controls
  }


  //Login 
  onSubmit(): void {
    this.submitted = true;
  
    // const getIndex = this.existUser.findIndex(
    //   (usr: { email: any; }) => 
    //     usr.email === this.form.value.email
    // )
    // if (getIndex !== -1){
    //   console.log(getIndex)
    //   // this.existUser[getIndex]
    //   console.log(this.existUser)
    // }
    // if (getIndex !== -1){
    //   if(this.existUser[getIndex].email === this.form.value.email) {
    //     console.log("exit User")
    //   }else{
    //     console.log("not found")
    //   }
      
    //   } 
    if (this.form.invalid) {
      return;
    }

    let exist =  this.existUser.find((x:any) => x.email == this.form.value.email);
    console.log(exist)
    if(exist === undefined){
      console.log("user not Exist")
      alert("User not exist , Please contact ZeeWeeSoft Tech")
    }else{
      if(exist.email === this.form.value.email && exist.password === this.form.value.password){
        console.log("Login", this.form.value)
        localStorage.setItem('userLoggedIn' ,JSON.stringify(exist))
        this.toater.success("Loggin Succesfull", "Success")
        this._router.navigate(['/home']).then(()=> {
          window.location.reload()
        })
      }else{
        console.log("Creeentials galat", this.form.value)
        alert("Email and password incorrect")
      }
     
    

    }

  

    // console.log(JSON.stringify(this.form.value, null, 2));
  }

}
