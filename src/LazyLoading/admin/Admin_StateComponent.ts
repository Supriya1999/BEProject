import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
import { $ } from "protractor";
@Component({
    selector:'app-root',
    templateUrl:'Admin_State.html',
})
export class StateClass{

    states:any; 
    stateform:FormGroup; 
    display:any="none"
    action:any=""
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetStates(); 
        this.NewStateForm();
    }  
    NewStateForm(){ 
        this.stateform=this.fb.group({
            state_id:[null],
            state_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    SubmitData(s){
        switch(this.action)
        {
            case "Add":
                {
        this.api.PostApi("state",s).subscribe(e=>{
            //       console.log(e);
                alert(e.msg)
                this.NewStateForm();
                this.GetStates();
                this.CloseModal();
        })
    break;
    }
    case "Update":
        {
this.api.PutApi("state",s).subscribe(e=>{
    alert(e.msg);
    this.NewStateForm();
    this.GetStates();
    this.CloseModal();
})
break;
}
        }
        }
        GetStates(){
            this.api.GetApi("state").subscribe(e=>this.states=e)
        }
    ViewStateForm(s){
        this.stateform=this.fb.group({
            state_id:[s.state_id],
            state_name:[s.state_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
      
        // $("#exampleModalLabel").modal("show")
    }
    View(s){
        //  alert("")
          this.ViewStateForm(s);
          this.action="Update";
          this.display="block"
  
      }
    OpenModal(){
        this.NewStateForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(s){
        this.api.DeleteApi("state?state_id="+s.state_id).subscribe(e=>{
            alert(e.msg)
        //    this.NewQualificationForm();
           this.GetStates();
         
   
       })
    }
}