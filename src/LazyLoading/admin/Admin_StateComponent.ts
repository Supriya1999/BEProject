import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_State.html',
})
export class StateClass{

    states:any; 
    stateform:FormGroup;
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
        this.api.PostApi("state",s).subscribe(e=>{
     //       console.log(e);
            this.NewStateForm();
            this.GetStates();
        })
    }
    GetStates(){
        this.api.GetApi("state").subscribe(e=>this.states=e)
    }
}