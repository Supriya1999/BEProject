import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
import { timeStamp } from "console";
@Component({
    selector:'app-root',
    templateUrl:'Courses.html'
})
export class CoursesClass{
    courses:any;
    coursesform:FormGroup;
    display:any="none"
    action:any=""
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
        switch(this.action){
            case "Add":
            {
                this.api.PostApi("courses",s).subscribe(e=>{
                    alert(e.msg)
                    this.NewCoursesForm();
                    this.GetCourses();
                    this.CloseModal();
                })    
                break;
            }
            case "Update":
            {
                this.api.PutApi("courses",s).subscribe(e=>{
                    alert(e.msg)
                    this.NewCoursesForm();
                    this.GetCourses();
                    this.CloseModal();
                })
                break;
            }
        }



            
    } 
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)
    }
    ViewCoursesForm(c){
        this.coursesform=this.fb.group({
            course_id:[c.course_id],
            course_name:[c.course_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    View(c){
          console.log(c)
          this.ViewCoursesForm(c);
          this.action="Update";
          this.display="block"
  
      }
    OpenModal(){ 
        this.NewCoursesForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(c){
        this.api.DeleteApi("courses?course_id="+c.course_id).subscribe(e=>{
            alert(e.msg)
            this.GetCourses();
          
   
       })
    } 
}  