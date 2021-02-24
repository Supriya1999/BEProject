import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
@Component({
    selector:'app-root',
    templateUrl:'CreateExam.html'
})
export class CreateExamClass{
courses:any;
year_id:any;
years:any
course_id:any;
subject_id:any;
subjects:any=[];
unit_id:any
units:any=[];
level_id:any
examlevels:any=[];
examquestions:any=[];
question:any;
option1:any;
option2:any;
option3:any;
option4:any;
correct_option_id:any;

constructor(private api:GenericApi){
this.GetCourses();
this.GetExamLevels();
}
GetCourses(){
    this.api.GetApi("courses").subscribe(e=>this.courses=e)
    this.subjects=[];
    this.units=[];
}
GetYears(cid:any){
    this.api.GetApi("years?course_id="+cid).subscribe(e=>this.years=e)
    this.units=[];
}
GetSubjects(yid:any){
    this.api.GetApi("subjects?year_id="+yid).subscribe(e=>this.subjects=e)
}
GetUnits(sid:any){
    this.api.GetApi("units?subject_id="+sid).subscribe(e=>this.units=e)
}
GetExamLevels(){
    this.api.GetApi("examlevels").subscribe(e=>this.examlevels=e)
}
AddQuestion(q,o1,o2,o3,o4,co){
    this.examquestions.push({"question":q,"option1":o1,"option2":o2,"option3":o3,"option4":o4,"correct_option_id":co})
    this.question=this.option1=this.option2=this.option3=this.option4=this.correct_option_id=null;
}
CreateExam(uid,lid){
    var st={"unit_id":uid,"level_id":lid,"employee_id":1,"examquestions":this.examquestions};
    this.api.PostApi("exam",st).subscribe(e=>console.log(e));
}
}