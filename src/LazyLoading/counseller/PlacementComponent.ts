import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Placement.html'
})
export class PlacementClass{
    students:any;
    student_id:any;
    opening:any;
    registration:any;
    course:any;
    course_id:any;
    year_id:any;
    year:any;
    openingform:FormGroup;
    placementform:FormGroup;
    placements:any;
    photo:any;
    server:any="http://localhost:8000/";

    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetOpenings();
        //this.GetStudents();
        this.GetCourses();
        this.NewOpeningForm();
        this.NewPlacementForm();
        this.GetPlacements();
    } 
    NewOpeningForm(){ 
        this.openingform=this.fb.group({
            opening_id:[null],
            company_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            opening_date:[null],
            requirements:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            qualification:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            percentage:[null,[Validators.compose([Validators.required,Validators.pattern("[0-9]+")])]],
            description:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z0-9]+")])]]
        
        })
    }
    NewPlacementForm(){
        this.placementform=this.fb.group({
            select_id:[null],
            registeration_id:[null],
            course_id:[null],
            year_id:[null],
            company_name:[null],
            package:[null],
            placement_date:[null],
            pic:[null]
        })
    }
    SubmitData(s){
            this.api.PostApi("openings",s).subscribe(e=>{
            this.NewOpeningForm();
            this.GetOpenings();
        })
    } 
    SubmitPlacementData(s){
        var data=new FormData();
        data.append("registeration_id",s.registeration_id)
        data.append("company_name",s.company_name)
        data.append("package",s.package)
        data.append("placement_date",s.placement_date)
        data.append("photo",this.photo[0])
        this.api.PostApi("placements",data).subscribe(e=>{
            this.NewPlacementForm();
            //this.GetStudents();
        })
    } 

onSelectFile(e:any){
    this.photo=e;
    //console.log(this.photo[0])
  }
GetCourses(){
    this.api.GetApi("courses").subscribe(e=>this.course=e)
}
GetYears(cid:any){
    this.api.GetApi("years?course_id="+cid).subscribe(e=>this.year=e)
}
GetOpenings(){
    this.api.GetApi("openings").subscribe(e=>this.opening=e)
}
GetStudents(yid:any){
    this.api.GetApi("student_details?year_id="+yid).subscribe(e=>this.students=e)
}
GetPlacements(){
    this.api.GetApi("placements").subscribe(e=>this.placements=e)
}
}  