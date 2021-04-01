import { templateJitUrl } from "@angular/compiler"
import {Component} from "@angular/core"
import { FormBuilder } from "@angular/forms";
import {ActivatedRoute} from "@angular/router" 
import { GenericApi } from "../APIS/GenericApi";
@Component({
    selector:'app-root',
    templateUrl:'Super_EmployeeView.html',
})
export class SuperUserEmployeeViewClass{
     id:any=0;
     s:any;
     qualifications:any;
     documents:any;
     server:any="http://localhost:8000/"
     constructor(private rt:ActivatedRoute,private api:GenericApi,private fb:FormBuilder)
    {
        this.rt.params.subscribe(e=>{
            this.id=e["id"]
        })
        this.GetEmployeeById(this.id)
    }
    GetEmployeeById(id){
        this.api.GetApi("employee_details?employee_id="+id).subscribe(e=>this.s=e)
    }
}