
import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Role.html',
})
export class RoleClass{

    roles:any; 
    display:any="none"
    action:any=""
    roleform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetRoles();
        this.NewRoleForm();
    } 
    NewRoleForm(){ 
        this.roleform=this.fb.group({
            role_id:[null],
            role:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    SubmitData(s){
        switch(this.action)
        {
            case "Add":
                {
                    this.api.PostApi("role",s).subscribe(e=>{
                        //       console.log(e);
                               this.NewRoleForm();
                               this.GetRoles();
                               this.CloseModal();
                           })
                           break;
                }
                case "Update":
        {

this.api.PutApi("role",s).subscribe(e=>{
//       console.log(e);
alert(e.msg)
    this.NewRoleForm();
    this.GetRoles();
    this.CloseModal();

})
break;
        }
    }
}
    GetRoles(){
        this.api.GetApi("role").subscribe(e=>this.roles=e)
    }
    ViewRoleForm(s){
        this.roleform=this.fb.group({
            role_id:[s.role_id],
            role:[s.role,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
      
        // $("#exampleModalLabel").modal("show")
    }
    View(s){
      //  alert("")
        this.ViewRoleForm(s);
        this.action="Update";
        this.display="block"

    }
    OpenModal(){
        this.NewRoleForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(s){
        this.api.DeleteApi("role?role_id="+s.role_id).subscribe(e=>{
            alert(e.msg)
        //    this.NewRoleForm();
           this.GetRoles();
         
   
       })
    }
}
