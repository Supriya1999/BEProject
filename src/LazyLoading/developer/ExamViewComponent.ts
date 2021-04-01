import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {ActivatedRoute} from "@angular/router"
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'ExamView.html'
})
export class ExammViewClass{
    id:any=0;
    s:any;
    qualifications:any;
    constructor(private rt:ActivatedRoute,private api:GenericApi,private fb:FormBuilder){
        this.rt.params.subscribe(e=>{
             
            this.id=e["id"]

        }) 
        this.GetExamById(this.id)
    }

    GetExamById(id){
       
            this.api.GetApi("exam?exam_id="+id).subscribe(e=>this.s=e)
       
    }
}