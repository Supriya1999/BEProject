import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import { ApiUrl} from "../APIS/GetApiUrl" 
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Qualification.html',
})
export class QualificationClass{
    qualification_names:any;
    qualificationform:FormGroup;
    constructor(private api:GenericApi,private fb: FormBuilder){
        this.GetQualification();
        this.NewQualificationForm();
    }
    NewQualificationForm(){
        this.qualificationform=this.fb.group({
            qualification_id:[null],
            qualification:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    SubmitData(s){
        this.api.PostApi("qualification",s).subscribe(e=>{
     //       console.log(e);
            this.NewQualificationForm();
            this.GetQualification();
        })
    }
    GetQualification(){
        this.api.GetApi("qualification").subscribe(e=>this.qualification_names=e)
    }
}