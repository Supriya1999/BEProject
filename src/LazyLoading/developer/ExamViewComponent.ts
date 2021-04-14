import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {ActivatedRoute} from "@angular/router"
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'ExamView.html'
})
export class ExammViewClass{
    id:any=0;
    s:any;
    qualifications:any;
    display:any="none";
    examquestionform:FormGroup;
    constructor(private rt:ActivatedRoute,private api:GenericApi,private fb:FormBuilder){
        this.NewQuestionForm();
        this.rt.params.subscribe(e=>{
             
            this.id=e["id"]

        }) 
        this.GetExamById(this.id)
    }
    
    NewQuestionForm()
    {
        this.examquestionform=this.fb.group({
            question_id:[null],
            exam_id:[null],
            question:[null],
            option1:[null],
            option2:[null],
            option3:[null],
            option4:[null],
            correct_answer_option:[null]
            
        })
    }
    GetExamById(id){
       
            this.api.GetApi("exam?exam_id="+id).subscribe(e=>this.s=e)
       
    }
    ViewQuestionForm(q)
    {
        this.examquestionform=this.fb.group({
            question_id:[q.question_id],
            exam_id:[q.exam_id],
            question:[q.question],
            option1:[q.option1],
            option2:[q.option2],
            option3:[q.option3],
            option4:[q.option4],
            correct_answer_option:[q.correct_answer_option],
            
        })
    }
    View(q)
    {
        
        console.log(q)
        this.ViewQuestionForm(q)
        this.display="block"
    }
    SubmitData(s){
        var data=new FormData()
        data.append("question_id",s.question_id)
        data.append("question",s.question)
        data.append("option1",s.option1)
        data.append("option2",s.option2)
        data.append("option3",s.option3)
        data.append("option4",s.option4)
        data.append("correct_answer_option",s.correct_answer_option)

        this.api.PutApi("examquestion",data).subscribe(e=>{
            alert(e.msg)
            this.NewQuestionForm();
            this.GetExamById(this.id);
            this.CloseModal();
        })
    }
    CloseModal(){
        this.display="none"
    }
    Delete(q)
    {
        this.api.DeleteApi("examquestion?question_id="+q.question_id).subscribe(e=>{
            alert(e.msg)
            this.GetExamById(this.id);
        })
    }
}