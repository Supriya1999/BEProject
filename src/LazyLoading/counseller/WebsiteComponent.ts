import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"

@Component({
    selector:'app-root',
    templateUrl:'Website.html'
})
export class WebsiteClass{
    website:any;
    constructor(private api:GenericApi){
        this.GetWebsite();
    }
    GetWebsite(){
        this.api.GetApi("http://localhost:8000/website_enquiry").subscribe(e=>this.website=e)
    }
} 