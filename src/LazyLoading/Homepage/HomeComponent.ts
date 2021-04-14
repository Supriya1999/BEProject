import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"

@Component({
    selector:'app-root',
    templateUrl:'Home.html'
})
export class HomeClass{
    websiteform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.NewWebsiteForm();
    }
    NewWebsiteForm(){ 
        this.websiteform=this.fb.group({
            candidate_name:[null],
            email:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]")])]],
            mobile_number:[null,[Validators.compose([Validators.required,Validators.pattern("[0-9]")])]],
            message:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]")])]]
            
        })
    }
    SubmitData(s){
            this.api.PostApi("website_enquiry",s).subscribe(e=>{
            this.NewWebsiteForm();
            
        })
    }
}  