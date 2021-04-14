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
        this.api.GetApi("website_enquiry").subscribe(e=>this.website=e)
    }
    DeleteWebsite(w)
    {
        this.api.DeleteApi("website_enquiry?website_enquiry_id="+w.website_enquiry_id).subscribe(e=>{
            alert(e.msg)
            this.GetWebsite();
        })
    }
} 