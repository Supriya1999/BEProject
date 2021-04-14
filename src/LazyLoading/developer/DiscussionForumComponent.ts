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
    displaygroup:any="none";
    displayassignment:any="none";
    displaymessage:any="none";
    displaymember:any="none";
    displaymsg:any="none";
    action:any=""
    server:any="http://localhost:8000/"
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetCourses();
        this.NewGroupForm();
        this.NewMemberForm();
        this.NewMessageForm();
        this.NewAssignmentForm();
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
        
    }
    NewMemberForm(){
        this.groupmemberform=this.fb.group({
            member_id:[null],
            group_id:[null],
            course_id:[null],
            year_id:[null],
            student_id:[null]
        })
    }
    NewAssignmentForm(){
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
    }
    NewMessageForm(){
            this.groupmessageform=this.fb.group({
                message_id:[null],
                group_id:[null],
                message_date:[null],
                message_for:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
                message:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]]
                
            })
        }
        

 
    AddGroup(s){
        switch(this.action)
        {
            case "Add":
                {
                    this.api.PostApi("creategroup",s).subscribe(e=>{
                        alert(e.msg)
                        this.NewGroupForm();
                        this.GetGroup();
                        this.CloseGroupModal()
                    })
                    break;
                }
            case "Update":
                {
                    this.api.PutApi("creategroup",s).subscribe(e=>{
                        alert(e.msg)
                        this.NewGroupForm();
                        this.GetGroup();
                        this.CloseGroupModal()
                    })
                    break;
                }
        }
           
    }
    
    GetGroup(){
        this.api.GetApi("creategroup").subscribe(e=>this.group=e)

    } 
    
    GetGroupMember() {
        this.api.GetApi("groupmembers").subscribe(e=>this.groupmember=e)
    
    } 
    AddGroupMembers(s){
        switch(this.action)
        {
            case "Add":
            {
                var data={"group_id":s.group_id,"student_id":this.checkarray}
                this.api.PostApi("groupmembers",data).subscribe(e=>{
                    alert(e.msg);
                    this.NewGroupForm();
                    this.GetGroupMember();
                    this.CloseMemberModal();
                })
                break;

            }
            case "Update":
            {
                var dataa={"member_id":s.member_id,"group_id":s.group_id,"student_id":this.checkarray}
                this.api.PutApi("groupmembers",dataa).subscribe(e=>{
                    alert(e.msg);
                    this.NewGroupForm();
                    this.GetGroupMember();
                    this.CloseMemberModal();
                })
                break;
            }
        }
        
    }
    AddGroupAssignment(s){
        switch(this.action)
        {
            case "Add":
            {
                var data=new FormData()
                data.append("group_id",s.group_id)
                data.append("unit_id",s.unit_id)
                data.append("assignment_date",s.assignment_date)
                data.append("assignment_question",s.assignment_question)
                data.append("mail",s.mail)
                data.append("document",this.document[0])
                this.api.PostApi("groupassignment",data).subscribe(e=>{
                    alert(e.msg);
                    this.NewGroupForm();
                    this.GetGroupAssignment();
                    this.CloseAssignmentModal();
                })
                break;

            }
            case "Update":
            {
                var data=new FormData()
                data.append("assignment_id",s.assignment_id)
                data.append("group_id",s.group_id)
                data.append("unit_id",s.unit_id)
                data.append("assignment_date",s.assignment_date)
                data.append("assignment_question",s.assignment_question)
                data.append("mail",s.mail)
                if(this.document==null)
                {
                    data.append("document","")
                }
                else
                {
                    data.append("document",this.document[0])
                }   
                this.api.PutApi("groupassignment",data).subscribe(e=>{
                    alert(e.msg);
                    this.NewGroupForm();
                    this.GetGroupAssignment();
                    this.CloseAssignmentModal();
                  
                })
                break;
            }
        }
         
    }
    onSelectFile(e:any){
        this.document=e;
        //console.log(this.photo[0])
    }
    GetGroupAssignment(){
        this.api.GetApi("groupassignment").subscribe(e=>this.groupassignment=e)

    }
    AddGroupMessage(s){
        switch(this.action) 
        {   
            case "Add":
                this.api.PostApi("groupmessage",s).subscribe(e=>{
                    alert(e.msg);
                    this.NewGroupForm();
                    this.GetGroupMessage();
                    this.CloseMessageModal();
                }) 
            break;
            case "Update":
                this.api.PutApi("groupmessage",s).subscribe(e=>{
                    alert(e.msg);
                    this.NewGroupForm();
                    this.GetGroupMessage();
                    this.CloseMessageModal();
                })    
            break;
        }
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
    ViewGroupForm(g){
        this.groupform=this.fb.group({
            group_id:[g.group_id],
            group_name:[g.group_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            course_id:[g.course_id],
            year_id:[g.year_id],
            start_date:[g.start_date],
            end_date:[g.end_date],
            
        })
    }
    ViewGroup(g){
        console.log(g)
        this.ViewGroupForm(g);
        this.action="Update";
        this.displaygroup="block"

    }
    OpenGroupModal(){
        this.NewGroupForm();
        this.action="Add";
        this.displaygroup="block"

    }
    CloseGroupModal(){
        this.action="";
        this.displaygroup="none"
    }
    DeleteGroup(g){
        this.api.DeleteApi("creategroup?group_id="+g.group_id).subscribe(e=>{
            alert(e.msg)
            this.GetGroup();
        })
    }
    ViewMemberForm(m){
        this.groupmemberform=this.fb.group({
            member_id:[m.member_id],
            group_id:[m.group_id],
            course_id:[m.course_id],
            year_id:[m.year_id],
            student_id:[m.student_id]
        })
    }
    ViewMembers(m){
        console.log(m)
        this.ViewMemberForm(m);
        this.action="Update";
        this.displaymember="block"
    }
    OpenMemberModal(){
        this.NewMemberForm();
        this.action="Add";
        this.displaymember="block"
    }
    CloseMemberModal(){
        this.action="";
        this.displaymember="none";
        this.checkarray=[]
        
    }
    DeleteMembers(m){
        this.api.DeleteApi("groupmembers?member_id="+m.member_id).subscribe(e=>{
            alert(e.msg)
            this.GetGroupMember();
        })
    }
    ViewAssignmentForm(g){
            this.groupassignmentform=this.fb.group({
            assignment_id:[g.assignment_id],
            group_id:[g.group_id],
            course_id:[g.course_id],
            year_id:[g.year_id],
            subject_id:[g.subject_id],
            unit_id:[g.unit_id],
            assignment_date:[g.assignment_date],
            mail:[g.mail,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            assignment_question:[g.assignment_question,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            document:[g.document]
        })
    }
    ViewAssignment(g){
        console.log(g)
        this.ViewAssignmentForm(g);
        this.action="Update";
        this.displayassignment="block"
        this.displaymsg="block"
    }
    OpenAssignmentModal(){
        this.NewAssignmentForm();
        this.action="Add";
        this.displayassignment="block"
        this.displaymsg="none"

    }
    CloseAssignmentModal(){
        this.action="";
        this.displayassignment="none"
        this.displaymsg="none"

    }
    DeleteAssignment(g){
        this.api.DeleteApi("groupassignment?assignment_id="+g.assignment_id).subscribe(e=>{
            alert(e.msg)
            this.GetGroupAssignment();
        })
    }
    ViewMessageForm(m){
        this.groupmessageform=this.fb.group({
            message_id:[m.message_id],
            group_id:[m.group_id],
            message_date:[m.message_date],
            message_for:[m.message_for,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            message:[m.message,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]]
        })
    }
    ViewMessage(m){
        console.log(m)
        this.ViewMessageForm(m);
        this.action="Update";
        this.displaymessage="block"

    }
    OpenMessageModal(){
        this.NewMessageForm();
        this.action="Add";
        this.displaymessage="block"

    }
    CloseMessageModal(){
        this.action="";
        this.displaymessage="none"
    }
    
    DeleteMessage(m){
        this.api.DeleteApi("groupmessage?message_id="+m.message_id).subscribe(e=>{
            alert(e.msg)
            this.GetGroupMessage();
        })
    }   
    
}