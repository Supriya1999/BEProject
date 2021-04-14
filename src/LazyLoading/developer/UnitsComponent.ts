import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Units.html'
})
export class UnitsClass{
    courses:any;
    years:any=[];
    subjects:any=[];
    unitform:any;
    units:any;
    description:any;
    msg:any;
    video:any;
    cid:any;
    yid:any;
    display:any="none"
    displaymsg:any="none"
    action:any=""
    server:any="http://localhost:8000/";
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewUnitsForm();
        this.GetCourses();
        // this.GetYear();
        // this.GetSubject();
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
            video_length:[null],
            video:[null]
        })
    }
    AddUnit(s){
        switch(this.action){
            case "Add":
            {
                var data=new FormData();
                data.append("subject_id",s.subject_id)
                data.append("unit_name",s.unit_name)
                data.append("video",s.video)
                data.append("video_length",s.video_length)
                data.append("description",s.description)
                data.append("video",this.video[0])
                this.api.PostApi("units",data).subscribe(e=>{
                    alert(e.msg);
                    this.NewUnitsForm();
                    this.GetUnit();
                    this.CloseModal();
                })
                break;
            }
            case "Update":
            {
                var data=new FormData();
                data.append("unit_id",s.unit_id)
                data.append("subject_id",s.subject_id)
                data.append("unit_name",s.unit_name)
                data.append("video",s.video)
                data.append("video_length",s.video_length)
                data.append("description",s.description)
                if(this.video==null)
                {
                    data.append("video","")
                }
                else
                {
                    data.append("video",this.video[0])
                }
                this.api.PutApi("units",data).subscribe(e=>{
                    alert(e.msg);
                    this.NewUnitsForm();
                    this.GetUnit();
                    this.CloseModal();
                })
                break;
            }
        }
        
    }
    
    onSelectFile(e:any){
        this.video=e;
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
    GetUnit(){
        this.api.GetApi("units").subscribe(e=>this.units=e)
    }
    ViewUnitForm(u){
        this.unitform=this.fb.group({
            unit_id:[u.unit_id],
            course_id:[u.course_id],
            year_id:[u.year_id],
            subject_id:[u.subject_id],
            unit_name:[u.unit_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            description:[u.description,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            video_length:[u.video_length],
            video:[u.video]
        })

    }
    View(u){
        console.log(u)
        this.ViewUnitForm(u);
        this.action="Update";
        this.display="block"
        this.displaymsg="block"   
    }
    OpenModal(){
        this.NewUnitsForm();
        this.action="Add";
        this.display="block"
        this.displaymsg="none"   
        
    }
    CloseModal(){
        this.action="";
        this.display="none";
        this.displaymsg="none"   

    }
    Delete(u){
        this.api.DeleteApi("units?unit_id="+u.unit_id).subscribe(e=>{
            alert(e.msg)
            this.GetUnit();
          
   
       })
    }
    
} 