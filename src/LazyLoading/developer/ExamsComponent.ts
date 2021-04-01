import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"

@Component({
    selector:'app-root',
    templateUrl:'Exams.html'
})
export class ExamsClass{
    exams:any;
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.GetExam();
    }
    GetExam(){
        this.api.GetApi("exam").subscribe(e=>this.exams=e)
    }
}