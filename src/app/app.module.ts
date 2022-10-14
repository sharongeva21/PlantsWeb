import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { FormBuilder } from '@angular/forms';




//primeng  imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';


import { AppComponent } from './app.component';
import { PlantsAllComponent } from './plants-all/plants-all.component';
import { LoginComponent } from './login/login.component';
import { PlantBuyComponent } from './plant-buy/plant-buy.component';


const appRoutes: Routes = [
  { path: '', component: PlantsAllComponent },
  { path: 'login/:type', component: LoginComponent },
  { path: 'user/:id', component: PlantsAllComponent },
  { path: 'buyPlant', component: PlantBuyComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    PlantsAllComponent,
    LoginComponent,
    PlantBuyComponent
    ,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // FormBuilder,

    // primeng imports
    CardModule,
    DialogModule,
    InputTextModule,

    //routing
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
