import {Component} from '@angular/core'
import {ActivatedRoute} from "@angular/router"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'InvoiceView.html'

})
export class InvoiceViewClass{
    id:any=0;
    a:any;
    constructor(private rt:ActivatedRoute,private api:GenericApi,private fb:FormBuilder){
        this.rt.params.subscribe(e=>{
            this.id=e["id"]
        })
        this.GetStudentById(this.id)
    }
    GetStudentById(id){
        this.api.GetApi("student_details?registeration_id="+id).subscribe(e=>this.a=e[0])
    }
}  