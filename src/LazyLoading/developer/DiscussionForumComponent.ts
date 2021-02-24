import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'DiscussionForum.html'
})
export class DiscussionForumClass{
    groupform:any;
    courses:any;
    years:any;
    group:any;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetCourses();
        this.GetYear();
        this.NewGroupForm();
        this.GetGroup();
    }
    NewGroupForm(){ 
        this.groupform=this.fb.group({
            group_id:[null],
            group_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            course_id:[null],
            year_id:[null],
            start_date:[null],
            end_date:[null]
        })
    } 
    AddGroup(s){
            this.api.PostApi("creategroup",s).subscribe(e=>{
            this.NewGroupForm();
            this.GetGroup();
        }) 
    } 
    GetGroup(){
        this.api.GetApi("creategroup").subscribe(e=>this.group=e)

    }
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)
    }
    
    GetYear(){
        this.api.GetApi("years").subscribe(e=>this.years=e)
    }
}