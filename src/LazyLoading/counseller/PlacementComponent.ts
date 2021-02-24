import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Placement.html'
})
export class PlacementClass{
    opening:any;
    openingform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetOpenings();
        this.NewOpeningForm();
    }
    NewOpeningForm(){ 
        this.openingform=this.fb.group({
            opening_id:[null],
            company_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            opening_date:[null],
            requirements:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            qualification:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            percentage:[null,[Validators.compose([Validators.required,Validators.pattern("[0-9]+")])]],
            description:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z0-9]+")])]]
        
        })
    }
    SubmitData(s){
            this.api.PostApi("http://localhost:8000/openings",s).subscribe(e=>{
            this.NewOpeningForm();
            this.GetOpenings();
        })
    } 
    GetOpenings(){
        this.api.GetApi("http://localhost:8000/openings").subscribe(e=>this.opening=e)
    }
}  