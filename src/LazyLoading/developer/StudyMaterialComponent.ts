import {Component} from "@angular/core"
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
    server:any="http://localhost:8000/";

    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetCourses();
        this.GetYear();
        this.GetSubject();
        this.GetUnit();
        this.GetStudy();
        this.NewStudyForm();
    }
    NewStudyForm(){ 
        this.studyform=this.fb.group({
            ppt_id:[null],
            unit_id:[null],
            description:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            ppt:[null]
        })
    }
    AddStudy(s){
            var data =new FormData();
            data.append("unit_id",s.unit_id)
            data.append("unit_title",s.unit_title)
            data.append("description",s.description)
            data.append("ppt",this.ppt[0])
            this.api.PostApi("studymaterial",data).subscribe(e=>{
            this.NewStudyForm();
            this.GetStudy();
        })
    }
    
    onSelectFile(e:any){
        this.ppt=e;
        //console.log(this.photo[0])
    } 
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)
    }
    
    GetYear(){
        this.api.GetApi("years").subscribe(e=>this.years=e)
    }
    GetSubject(){
        this.api.GetApi("subjects").subscribe(e=>this.subjects=e)
    }
    GetUnit(){
        this.api.GetApi("units").subscribe(e=>this.units=e)
    }   
    GetStudy(){
        this.api.GetApi("studymaterial").subscribe(e=>this.studymaterial=e)
    }
} 