import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { Subject } from 'rxjs/Rx';
declare let componentHandler: any;
@Component({
    selector: "products-listing",
    template: `
        <div class="mdl-grid">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-cell mdl-cell--6-col">
                <h3>Search:</h3>
                <input class="mdl-textfield__input" type="text" (keyup.enter)="search(searchBox.value)" placeholder="Enter your search keyword and press enter." id="search">
            </div>
            <div class="mdl-cell mdl-cell--6-col">
                <h3>Sort by:</h3>
                <label *ngFor="let sortType of ['rating', 'price']" class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-1">
                    <input type="radio" (click)="sortItBy(sortType)" class="mdl-radio__button" name="sort" [value]="sortType">
                    <span class="mdl-radio__label">{{sortType[0].toUpperCase()+sortType.substr(1).toLowerCase()}}</span>
                </label>
            </div>
        </div>
        
        
        
        
        <div class="mdl-grid">
            
                <div  *ngFor="let product of products" class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
                    
                    <figure class="mdl-card__media">
                        <div class="mdl-grid">
                            <div class="mdl-layout-spacer"></div>
                            
                                <img class="mdl-cell--4-col" [src]="product.image" height="145px;">
                            
                            <div class="mdl-layout-spacer"></div>
                        </div>
                        
                    </figure>
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">{{product.name}}</h2>
                    </div>
                    <div class="mdl-card__supporting-text">
                        <ul class="demo-list-item mdl-list">
                            <li class="mdl-list__item">
                                <span class="mdl-list__item-primary-content">
                                Purchased by <b>{{product.purchased_by}}</b>
                                </span>
                            </li>
                            <li class="mdl-list__item">
                                <span class="mdl-list__item-primary-content">
                                Rating : <rating [readonly]="true" [(ngModel)]="product.rating"></rating>
                                </span>
                            </li>
                            <li class="mdl-list__item">
                                <span class="mdl-list__item-primary-content">
                                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                        <path fill="#000000" d="M8,3H18L17,5H13.74C14.22,5.58 14.58,6.26 14.79,7H18L17,9H15C14.75,11.57 12.74,13.63 10.2,13.96V14H9.5L15.5,21H13L7,14V12H9.5V12C11.26,12 12.72,10.7 12.96,9H7L8,7H12.66C12.1,5.82 10.9,5 9.5,5H7L8,3Z" />
                                    </svg> {{product.price}}
                                </span>
                            </li>
                            <li class="mdl-list__item">
                                <span class="mdl-list__item-primary-content">
                                    <span *ngFor="let tag of product.tags" class="mdl-chip">
                                        <span class="mdl-chip__text">{{tag}}</span>
                                    </span>
                                </span>
                            </li>
                        </ul>
                         
                        
                    </div>
                    <div class="mdl-card__actions">
                        <a [href]="product.link" target="_blank">View more</a>
                    </div>
                </div>
            
        </div>
    `,
    styles: [`
        .mdl-card__media {
            background-color: white
        }
    `]
})
export class ProductsComponent implements OnInit{
    private _sortProducts$ = new Subject<string>();
    private _allProducts: Object[];
    private _searchProducts: Object[] = [];
    products: Object[];

    constructor(private _productService: ProductService){
        this._productService.fetch().subscribe(
            (data) => {this.products = data; this._allProducts = data}
        )

        this._sortProducts$.subscribe(
            (sortBy) =>{
                this.products = this.products.sort(function(a,b){
                    return a[sortBy] - b[sortBy]
                })
            }
        )
    }

    ngOnInit(){
        componentHandler.upgradeAllRegistered();
    }

    sortItBy(sortBy: string){
        this._sortProducts$.next(sortBy);
    }

    search(searchText:string){
        this._searchProducts = [];
        for(let product of this._allProducts){
            if(product["tags"].indexOf(searchText) != -1){
                this._searchProducts.push(product);
            }
        }
        if(this._searchProducts.length > 0){
            this.products = this._searchProducts;
        }
    }

}