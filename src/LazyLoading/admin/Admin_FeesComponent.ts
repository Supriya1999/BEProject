
import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Fees.html',
})
export class FeesssClass{
    fee:any;
    display:any="none"
    action:any=""
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
        switch(this.action)
        {
            case "Add":
                {
                    this.api.PostApi("fees",s).subscribe(e=>{
                        //       console.log(e);
                               this.NewFeeForm();
                               this.GetFee();
                               this.CloseModal();
                           })
                           break;;
            }
            case "Update":
                {
        
        this.api.PutApi("fees",s).subscribe(e=>{
        //       console.log(e);
        alert(e.msg)
            this.NewFeeForm();
            this.GetFee();
            this.CloseModal();
        
        })
        break;
        }
    }
}
    GetFee(){
        this.api.GetApi("fees").subscribe(e=>this.fee=e)
    }
    ViewFeeForm(s){
        this.feeform=this.fb.group({
            fees_mode_id:[s.fees_mode_id],
            fee_mode:[s.fee_mode,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
      
        // $("#exampleModalLabel").modal("show")
    }
    View(s){
      //  alert("")
        this.ViewFeeForm(s);
        this.action="Update";
        this.display="block"

    }
    OpenModal(){
        this.NewFeeForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(s){
        this.api.DeleteApi("fees?fees_mode_id="+s.fees_mode_id).subscribe(e=>{
            alert(e.msg)
        //    this.NewFeeForm();
           this.GetFee();
         
   
       })
    }
}


