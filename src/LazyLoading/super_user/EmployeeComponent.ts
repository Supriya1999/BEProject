import {Component} from '@angular/core'
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'employee.html'

})
export class EmployeeClass{
    emp:any;
    constructor(private api:GenericApi,private fb:FormBuilder){

        this.GetEmployee();

    }
GetEmployee(){
        this.api.GetApi("employee_details").subscribe(e=>this.emp=e)
}
    
        
   
    
}