import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Technology.html',
})
export class TechnologyClass{
    technology:any;
    technologyform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetTechnology();
        this.NewTechnologyForm();
    }
    NewTechnologyForm(){ 
        this.technologyform=this.fb.group({
            technology_id:[null],
            technology_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    SubmitData(s){
        this.api.PostApi("http://localhost:8000/technology",s).subscribe(e=>{
     //       console.log(e);
            this.NewTechnologyForm();
            this.GetTechnology();
        })
    }
    GetTechnology(){
        this.api.GetApi("http://localhost:8000/technology").subscribe(e=>this.technology=e)
    }
}