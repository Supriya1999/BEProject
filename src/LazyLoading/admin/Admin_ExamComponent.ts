import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Exam.html',
})
export class ExamssClass{

    exams:any; 
    display:any="none"
    action:any=""
    examform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetExams();
        this.NewExamForm();
    } 
    NewExamForm(){ 
        this.examform=this.fb.group({
            level_id:[null],
            level:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    SubmitData(s){
        switch(this.action)
        {
            case "Add":
                {
                    this.api.PostApi("examlevels",s).subscribe(e=>{
                        //       console.log(e);
                               this.NewExamForm();
                               this.GetExams();
                               this.CloseModal();
                           })
                           break;
                }
                case "Update":
        {

this.api.PutApi("examlevels",s).subscribe(e=>{
//       console.log(e);
alert(e.msg)
    this.NewExamForm();
    this.GetExams();
    this.CloseModal();

})
break;
        }
    }
}
    GetExams(){
        this.api.GetApi("examlevels").subscribe(e=>this.exams=e)
    }
    ViewQualificationForm(s){
        this.examform=this.fb.group({
            level_id:[s.level_id],
            level:[s.level,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
      
        // $("#exampleModalLabel").modal("show")
    }
    View(s){
      //  alert("")
        this.ViewQualificationForm(s);
        this.action="Update";
        this.display="block"

    }
    OpenModal(){
        this.NewExamForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(s){
        this.api.DeleteApi("examlevels?level_id="+s.level_id).subscribe(e=>{
            alert(e.msg)
        //    this.NewExamForm();
           this.GetExams();
         
   
       })
    }
}