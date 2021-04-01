import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'YearOfStudy.html'
})
export class YearOfStudyClass{
    courses:any;
    years:any;
    yearform:any;
    msg:any;
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewYearForm();
        this.GetCourses();
        this.GetYear();
    }
    NewYearForm(){
        this.yearform=this.fb.group({
            year_id:[null],
            course_id:[null],
            year_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            year_code:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z0-9 ]*")])]]
        })
    }
    AddYear(s){
        this.api.PostApi("years",s).subscribe(e=>{
            this.NewYearForm();
            this.GetYear();

        })
    }
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)
    }
    GetYear(){
        this.api.GetApi("years").subscribe(e=>this.years=e)
    } 
}
