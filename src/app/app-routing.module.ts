import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import my componentes
import {HomeComponent} from './components/home/home.component';
import {TacosViewComponent} from './components/tacos-view/tacos-view.component';
import {HeaderComponent} from './components/header/header.component';
//routes array
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'tacos', component:TacosViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
