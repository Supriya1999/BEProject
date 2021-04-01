
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
        this.api.PostApi("center_details",s).subscribe(e=>{
            this.NewBranchForm();
            this.GetBranch();
        })
    }
    GetBranch(){
        this.api.GetApi("center_details").subscribe(e=>this.branch=e)
    }
}