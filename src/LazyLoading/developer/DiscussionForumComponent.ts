import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'DiscussionForum.html'
})
export class DiscussionForumClass{
    groupform:any;
    groupassignmentform:any;
    groupmessageform:any;
    groupmemberform:any;
    groupmember:any;
    groupmessage:any;
    courses:any;
    years:any;
    group:any;
    groupassignment:any;
    subject:any;
    unit:any;
    course_id:any;
    year_id:any;
    subject_id:any;
    member_id:any;
    group_id:any;
    student_id:any;
    cid:any;
    yid:any;
    sid:any;
    student:any;
    students:any; 
    document:any;
    checkarray:any=[]
    server:any="http://localhost:8000/"
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetCourses();
        this.NewGroupForm();
        this.GetGroup();
        this.GetGroupAssignment();
        this.GetGroupMessage();
        this.GetGroupMember();
        this.GetStudent();

        } 
    NewGroupForm(){ 
        this.groupform=this.fb.group({
            group_id:[null],
            group_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            course_id:[null],
            year_id:[null],
            start_date:[null],
            end_date:[null],
            
        })

        this.groupmemberform=this.fb.group({
            member_id:[null],
            group_id:[null],
            course_id:[null],
            year_id:[null],
            student_id:[null]
        })
        this.groupassignmentform=this.fb.group({
            
            assignment_id:[null],
            group_id:[null],
            course_id:[null],
            year_id:[null],
            subject_id:[null],
            unit_id:[null],
            assignment_date:[null],
            mail:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            assignment_question:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            document:[null]
        })
        this.groupmessageform=this.fb.group({
            message_id:[null],
            group_id:[null],
            message_date:[null],
            message_for:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            message:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]]
            
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
    
    GetGroupMember() {
        this.api.GetApi("groupmembers").subscribe(e=>this.groupmember=e)
    
    } 
    AddGroupMembers(s){
        // var data="";
        // this.checkarray.forEach(function(d,i){
        //     data=data+","+d;
        // })
        // data=data.substr(1,data.length-1);
        s.ids=this.checkarray;
        this.api.PostApi("groupmembers",s).subscribe(e=>{
            this.NewGroupForm();
            this.GetGroupMember();
        })
    }
    AddGroupAssignment(s){
        var data=new FormData()
        data.append("group_id",s.group_id)
        data.append("unit_id",s.unit_id)
        data.append("assignment_date",s.assignment_date)
        data.append("assignment_question",s.assignment_question)
        data.append("mail",s.mail)
        data.append("document",this.document[0])
        this.api.PostApi("groupassignment",data).subscribe(e=>{
            this.NewGroupForm();
            this.GetGroupAssignment();
        }) 
    }
    onSelectFile(e:any){
        this.document=e;
        //console.log(this.photo[0])
    }
    GetGroupAssignment(){
        this.api.GetApi("groupassignment").subscribe(e=>this.groupassignment=e)

    }
    AddGroupMessage(s){
        this.api.PostApi("groupmessage",s).subscribe(e=>{
            this.NewGroupForm();
            this.GetGroupMessage();
        }) 
    }
    GetGroupMessage(){
        this.api.GetApi("groupmessage").subscribe(e=>this.groupmessage=e)
        
    }
    
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)
        this.subject=[]
        this.unit=[]
    }
    GetYears(cid:any){
        this.api.GetApi("years?course_id="+cid).subscribe(e=>this.years=e)
    }
    GetSubjects(yid:any){
        this.api.GetApi("subjects?year_id="+yid).subscribe(e=>this.subject=e)
    }
    GetUnits(sid:any){
        this.api.GetApi("units?subject_id="+sid).subscribe(e=>this.unit=e)
    } 
    GetStudent(){
        this.api.GetApi("student_details").subscribe(e=>this.student=e)

    }
    GetStudents(yid:any){
        this.api.GetApi("student_details?year_id="+yid).subscribe(e=>this.students=e)

    }
    GetId(e){
        var i=this.checkarray.indexOf(e);
        if(i==-1){
            this.checkarray.push(e);
        }
        else{
            this.checkarray.splice(i,1);
        }
        console.log(this.checkarray)
    }
    GroupMembers(group_id){
        var gm={"group_id":group_id,"student_id":this.checkarray}
        this.api.PostApi("groupmembers",gm).subscribe(e=>console.log(e));
    }
}