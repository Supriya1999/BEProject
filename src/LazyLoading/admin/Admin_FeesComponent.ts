import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Fees.html',
})
export class FeesClass{
    fee:any;
    feeform:FormGroup;
    constructor(private api:GenericApi,private fb: FormBuilder){
        this.GetFee();
        this.NewFeeForm();
    }
    NewFeeForm(){
        this.feeform=this.fb.group({
            fees_mode_id:[null],
            fee_mode:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    SubmitData(s){
        this.api.PostApi("http://localhost:8000/fees",s).subscribe(e=>{
     //       console.log(e);
            this.NewFeeForm();
            this.GetFee();
        })
    }
    GetFee(){
        this.api.GetApi("http://localhost:8000/fees").subscribe(e=>this.fee=e)
    }
}