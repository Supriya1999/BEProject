import {Component} from '@angular/core'
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Enquiry.html'
})
export class EnquiryClass{
    enquires:any;
    cat:any;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetEnquires();
        //this.GetCategories();
    }  
    GetEnquires(){
        this.api.GetApi("enquiry").subscribe(e=>this.enquires=e)
    }
}