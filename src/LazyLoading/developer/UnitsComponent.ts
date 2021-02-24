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
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewUnitsForm();
        this.GetCourses();
        this.GetYear();
        this.GetSubject();
        this.GetUnit();
    }
    NewUnitsForm(){
        this.unitform=this.fb.group({
            unit_id:[null],
            course_id:[null],
            year_id:[null],
            subject_id:[null],
            unit_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            description:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            video_length:[null]
        })
    }
    AddUnit(s){
        this.api.PostApi("units",s).subscribe(e=>{
            this.NewUnitsForm();
            this.GetUnit();
        })
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