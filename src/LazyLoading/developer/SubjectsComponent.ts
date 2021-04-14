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
    photo:any;
    msg:any;
    cid:any;
    display:any="none"
    displaymsg:any="none"
    action:any=""
    server:any="http://localhost:8000/";
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewSubjectForm();
        this.GetCourses();
       // this.GetYear();
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
        switch(this.action){
            case "Add":
            {
                var data =new FormData();
                data.append("year_id",s.year_id)
                data.append("subject_name",s.subject_name)
                data.append("description",s.description)
                data.append("photo",this.photo[0])
                this.api.PostApi("subjects",data).subscribe(e=>{
                    alert(e.msg)
                    this.NewSubjectForm();
                    this.GetSubject();
                    this.CloseModal();
                })
                break;
            }
            case "Update":
            {
                var data =new FormData();
                data.append("subject_id",s.subject_id)
                data.append("year_id",s.year_id)
                data.append("subject_name",s.subject_name)
                data.append("description",s.description)
                if(this.photo==null)
                {
                    data.append("photo","")
                }
                else
                {
                    data.append("photo",this.photo[0])
                }
                this.api.PutApi("subjects",data).subscribe(e=>{
                    alert(e.msg)
                    this.NewSubjectForm();
                    this.GetSubject();
                    this.CloseModal();
                    
                })
                break;

            }
        }
    } 
    onSelectFile(e:any){
        this.photo=e;
        console.log(this.photo[0])
      }
    GetSubject(){
        this.api.GetApi("subjects").subscribe(e=>this.subjects=e)

    }
    GetYear(cid){
        this.api.GetApi("years?course_id="+cid).subscribe(e=>this.years=e)
    }
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)

    }
    ViewSubjectForm(s){
        this.subjectform=this.fb.group({
            subject_id:[s.subject_id],
            course_id:[s.course_id],
            year_id:[s.year_id],
            subject_name:[s.subject_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            description:[s.description,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
        })
    }
    View(s){
          console.log(s)
          this.ViewSubjectForm(s);
          this.action="Update";
          this.displaymsg="block"
          this.display="block"
  
      }
    OpenModal(){
        this.NewSubjectForm();
        this.action="Add";
        this.display="block";
        this.displaymsg="none";
    }
    CloseModal(){
        this.action="";
        this.display="none";
        this.displaymsg="none";
    }
    
    Delete(s){
        this.api.DeleteApi("subjects?subject_id="+s.subject_id).subscribe(e=>{
            alert(e.msg)
            this.GetSubject();
          
   
       })
    }
}