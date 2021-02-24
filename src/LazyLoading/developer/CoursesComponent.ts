import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Courses.html'
})
export class CoursesClass{
    courses:any;
    coursesform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetCourses();
        this.NewCoursesForm();
    }
    NewCoursesForm(){ 
        this.coursesform=this.fb.group({
            course_id:[null],
            course_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    SubmitData(s){
            this.api.PostApi("courses",s).subscribe(e=>{
            this.NewCoursesForm();
            this.GetCourses();
        })
    } 
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)
    } 
} 