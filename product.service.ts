import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http, Response } from "@angular/http";

@Injectable()
export class ProductService {
    constructor(private _http: Http){
        
    }

    fetch(){
        return this._http.get("https://hackerearth.0x10.info/api/nitro_deals?type=json&query=list_deals")
                         .map((res) => {return res.json().deals})
    }
}