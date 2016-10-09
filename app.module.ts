import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ProductsComponent } from "./products.component";
import {FormsModule} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProductService } from "./product.service";
import {RatingModule, Rating} from "ng2-rating";

@NgModule({
    declarations: [
                  ProductsComponent
                  ],

    imports:      [
                  BrowserModule,
                  FormsModule,
                  CommonModule,
                  HttpModule,
                  RatingModule],
    providers:    [ProductService],
    bootstrap:    [ProductsComponent]
})
export class AppModule {

}
