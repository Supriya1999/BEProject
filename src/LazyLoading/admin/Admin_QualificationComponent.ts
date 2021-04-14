import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
import { $ } from "protractor";
@Component({
    selector:'app-root',
    templateUrl:'Admin_Qualification.html',
})
export class QualificationClass{
    qualification_names:any;
    display:any="none"
    action:any=""
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

        switch(this.action)
        {
            case "Add":
                {
        
        this.api.PostApi("qualification",s).subscribe(e=>{
             alert(e.msg)
            this.NewQualificationForm();
            this.GetQualification();
            this.CloseModal();
    
        })
   break;
    }
    case "Update":
        {

this.api.PutApi("qualification",s).subscribe(e=>{
//       console.log(e);
alert(e.msg)
    this.NewQualificationForm();
    this.GetQualification();
    this.CloseModal();

})
break;
}

    }
    
    }
    GetQualification(){
        this.api.GetApi("qualification").subscribe(e=>this.qualification_names=e)
    }
    ViewQualificationForm(s){
        this.qualificationform=this.fb.group({
            qualification_id:[s.qualification_id],
            qualification:[s.qualification,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
      
        // $("#exampleModalLabel").modal("show")
    }
    View(s){
      //  alert("")
        this.ViewQualificationForm(s);
        this.action="Update";
        this.display="block"

    }
    OpenModal(){
        this.NewQualificationForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(s){
        this.api.DeleteApi("qualification?qualification_id="+s.qualification_id).subscribe(e=>{
            alert(e.msg)
        //    this.NewQualificationForm();
           this.GetQualification();
          
   
       })
    }
}

