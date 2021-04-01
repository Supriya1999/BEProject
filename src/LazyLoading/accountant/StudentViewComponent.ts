import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {ActivatedRoute} from "@angular/router"
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'StudentView.html'
})
export class StudentViewClass{
    id:any=0;
    s:any;
    qualifications:any;
    server:any="http://localhost:8000/"
    constructor(private rt:ActivatedRoute,private api:GenericApi,private fb:FormBuilder){
        this.rt.params.subscribe(e=>{
             
            this.id=e["id"]

        }) 
        this.GetStudentById(this.id)
    }

    GetStudentById(id){
       
            this.api.GetApi("student_details?student_id="+id).subscribe(e=>this.s=e)
       
    }
}