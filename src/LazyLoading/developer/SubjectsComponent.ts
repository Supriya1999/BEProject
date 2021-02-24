import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Subjects.html'
})
export class SubjectsClass{
    subjects:any;
    courses:any;
    years:any;
    subjectform:any;
    description:any;
    msg:any;
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewSubjectForm();
        this.GetCourses();
        this.GetYear();
        this.GetSubject();
    }
    NewSubjectForm(){
        this.subjectform=this.fb.group({
            subject_id:[null],
            course_id:[null],
            year_id:[null],
            subject_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            description:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]]
        })
    }
    AddSubject(s){
        this.api.PostApi("subjects",s).subscribe(e=>{
            this.NewSubjectForm();
            this.GetSubject();
        })
    } 

    GetSubject(){
        this.api.GetApi("subjects").subscribe(e=>this.subjects=e)

    }
    GetYear(){
        this.api.GetApi("years").subscribe(e=>this.years=e)
    }
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)

    }
}