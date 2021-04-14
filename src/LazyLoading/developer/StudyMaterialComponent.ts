import {Component, Input} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'StudyMaterial.html'
})
export class StudyMaterialClass{
    studyform:any;
    courses:any;
    years:any;
    subjects:any;
    units:any;
    studymaterial:any
    ppt:any;
    action:any="";
    cid:any;
    yid:any;
    sid:any;
    course_id:any;
    year_id:any;
    subject_id:any;
    display:any="none";
    displaymsg:any="none";
    server:any="http://localhost:8000/";

    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetCourses();
        // this.GetYear();
        // this.GetSubject();
        // this.GetUnit();
        this.GetStudy();
        this.NewStudyForm();
    }
    NewStudyForm(){ 
        this.studyform=this.fb.group({
            ppt_id:[null],
            course_id:[null],
            year_id:[null],
            subject_id:[null],
            unit_id:[null],
            description:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            ppt:[null]
        })
    }
    AddStudy(s){
        switch(this.action)
        {
            case "Add":
            {
                var data =new FormData();
                data.append("unit_id",s.unit_id)
                data.append("unit_title",s.unit_title)
                data.append("description",s.description)
                data.append("ppt",this.ppt[0])
                this.api.PostApi("studymaterial",data).subscribe(e=>{
                    alert(e.msg);
                    this.NewStudyForm();
                    this.GetStudy();
                    this.CloseModal();
            })
                break;
            }
            case "Update":
            {
                var data =new FormData();
                data.append("ppt_id",s.ppt_id)
                data.append("unit_id",s.unit_id)
                data.append("unit_title",s.unit_title)
                data.append("description",s.description)
                if (this.ppt==null)
                {
                    data.append("ppt","")
                }
                else
                {
                    data.append("ppt",this.ppt[0])
                }
                this.api.PutApi("studymaterial",data).subscribe(e=>{
                    alert(e.msg);
                    this.NewStudyForm();
                    this.GetStudy();
                    this.CloseModal();
                })
                break;
            }
        }
            
    }
    
    onSelectFile(e:any){
        this.ppt=e;
        //console.log(this.photo[0])
    } 
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)
    }
    
    GetYear(cid){
        this.api.GetApi("years?course_id="+cid).subscribe(e=>this.years=e)
    }
    GetSubject(yid){
        this.api.GetApi("subjects?year_id="+yid).subscribe(e=>this.subjects=e)
    }
    GetUnit(sid:any){
        this.api.GetApi("units?subject_id"+sid).subscribe(e=>this.units=e)
    }   
    GetStudy(){
        this.api.GetApi("studymaterial").subscribe(e=>this.studymaterial=e)
    }
    ViewStudyForm(s){
        this.studyform=this.fb.group({
            ppt_id:[s.ppt_id],
            course_id:[s.course_id],
            year_id:[s.year_id],
            subject_id:[s.subject_id],
            unit_id:[s.unit_id],
            description:[s.description,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            ppt:[s.images]
        })
    }
    View(s){
        console.log(s)
        this.ViewStudyForm(s);
        this.action="Update";
        this.display="block"
        this.displaymsg="block"


    }
    OpenModal(){
        this.NewStudyForm();
        this.action="Add";
        this.display="block"
        this.displaymsg="none"


    }
    CloseModal(){
        this.action="";
        this.display="none"
        this.displaymsg="none"
        
    }
    
    Delete(s){
        this.api.DeleteApi("studymaterial?ppt_id="+s.ppt_id).subscribe(e=>{
            alert(e.msg)
            this.GetStudy();
          
   
       })
    }
} 