
import { group } from "@angular/animations";
import { templateJitUrl } from "@angular/compiler"
import {Component} from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms";
import { GenericApi } from "../APIS/GenericApi";
@Component({
    selector:'app-root',
    templateUrl:'Super_Branches.html',
})
export class SuperUserBranchesClass{
    branch:any;
    branchform:FormGroup;
    display:any="none"
    action:any=""
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetBranch();
        this.NewBranchForm();
    }
    NewBranchForm(){
        this.branchform=this.fb.group({
            center_id:[],
            center_code:[],
            center_type:[],
            college_name:[],
            gst_number:[],
            address:[],
            contact_number:[],
            email_address:[]
        })
    }
    SubmitData(s){
        switch(this.action){
            case "Add":
            {
                this.api.PostApi("center_details",s).subscribe(e=>{
                    alert(e.msg)
                    this.NewBranchForm();
                    this.GetBranch();
                    this.CloseModal();
                })
                break;    
            }
            case "Update":
            {
                this.api.PutApi("center_details",s).subscribe(e=>{
                    alert(e.msg)
                    this.NewBranchForm();
                    this.GetBranch();
                    this.CloseModal();
                })
                break;    
            }
        }
        
       
    }
    GetBranch(){
        this.api.GetApi("center_details").subscribe(e=>this.branch=e)
    }

    ViewBranchForm(b){
        this.branchform=this.fb.group({
            center_id:[b.center_id],
            center_code:[b.center_code],
            center_type:[b.center_type],
            college_name:[b.college_name],
            gst_number:[b.gst_number],
            address:[b.address],
            contact_number:[b.contact_number],
            email_address:[b.email_address]  
        })
    }
    View(b){
        console.log(b)
          this.ViewBranchForm(b);
          this.action="Update";
          this.display="block"
  
      }
    OpenModal(){
        this.NewBranchForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(b){
        this.api.DeleteApi("center_details?center_id="+b.center_id).subscribe(e=>{
            alert(e.msg)
            this.GetBranch();
          
   
       })
    } 
}