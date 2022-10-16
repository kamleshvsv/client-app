import { OrderSummeryComponent } from './order-summery/order-summery.component';
import { OrderListComponent } from './order-list/order-list.component';
import { CartComponent } from './cart/cart.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path:"" , redirectTo:"login", pathMatch : "full"},
  { path:"home", component:HomeComponent },
  { path:"single-product/:id", component:SingleProductComponent },
  { path:"cart", component:CartComponent },
  { path:"login", component:LoginComponent },
  { path:"order-list", component:OrderListComponent },
  { path:"checkout", component:OrderSummeryComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
