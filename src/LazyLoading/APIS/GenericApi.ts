import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import {ApiUrl} from "./GetApiUrl"
@Injectable()
export class GenericApi{

    constructor(private http:HttpClient,private url:ApiUrl){}
    GetApi(apiurl:any):any{
        return this.http.get(this.url.getUrl() +apiurl);
    }
    PostApi(apiurl:any,dt:any):any{
        return this.http.post(this.url.getUrl()+apiurl,dt);
    }
    PutApi(apiurl:any,dt:any):any{
        return this.http.put(this.url.getUrl()+apiurl,dt);
    }
    DeleteApi(apiurl:any,dt:any):any{
        return this.http.delete(this.url.getUrl()+apiurl,dt);
    }
}