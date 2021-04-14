import {Component} from '@angular/core'

import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Invoice.html'

})
export class InvoiceClass{
    student:any;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetStudent();
        
    }  
    GetStudent(){
        this.api.GetApi("student_payment").subscribe(e=>this.student=e)
    }
} 