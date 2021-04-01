import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Units.html'
})
export class UnitsClass{
    courses:any;
    years:any;
    subjects:any;
    unitform:any;
    units:any;
    description:any;
    msg:any;
    video:any;
    server:any="http://localhost:8000/";
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewUnitsForm();
        this.GetCourses();
        this.GetYear();
        this.GetSubject();
        this.GetUnit();
        this.video=null
    }
    NewUnitsForm(){
        this.unitform=this.fb.group({
            unit_id:[null],
            course_id:[null],
            year_id:[null],
            subject_id:[null],
            unit_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            description:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            video_length:[null],
            video:[null]
        })
    }
    AddUnit(s){
        var data=new FormData();
        data.append("subject_id",s.subject_id)
        data.append("unit_name",s.unit_name)
        data.append("video",s.video)
        data.append("video_length",s.video_length)
        data.append("description",s.description)
        data.append("video",this.video[0])
        this.api.PostApi("units",data).subscribe(e=>{
            this.NewUnitsForm();
            this.GetUnit();
            this.video=null;
        })
    }
    
    onSelectFile(e:any){
        this.video=e;
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
} 