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
    display:any="none"
    action:any=""
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
        switch(this.action){
            case "Add":
            {
                    this.api.PostApi("years",s).subscribe(e=>{
                        alert(e.msg)
                        this.NewYearForm();
                        this.GetYear();
                        this.CloseModal();
                    })
                    break;
            }
            case "Update":
            {
                this.api.PutApi("years",s).subscribe(e=>{
                    alert(e.msg)
                    this.NewYearForm();
                    this.GetYear();
                    this.CloseModal();
                })
                break;
            }
        }
    }
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)
    }
    GetYear(){
        this.api.GetApi("years").subscribe(e=>this.years=e)
    } 
    ViewYearForm(y){
        this.yearform=this.fb.group({
            year_id:[y.year_id],
            course_id:[y.course_id],
            year_name:[y.year_name],
            year_code:[y.year_code,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z0-9 ]*")])]]
        })
    }
    View(y){
          console.log(y)
          this.ViewYearForm(y);
          this.action="Update";
          this.display="block"
  
      }
    OpenModal(){
        this.NewYearForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(y){
        this.api.DeleteApi("years?year_id="+y.year_id).subscribe(e=>{
            alert(e.msg)
            this.GetYear();
          
   
       })
    }
}
