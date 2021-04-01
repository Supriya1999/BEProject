import {Component} from '@angular/core'
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Student.html'

})
export class StudentClass{
    student:any;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetStudent();
        
    }  
    GetStudent(){
        this.api.GetApi("student_details").subscribe(e=>this.student=e)
    }
    
}