import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Leads.html'
})
export class LeadsClass{
    lead_id:any;
    center_id:any;
    center_name: any;
    centers:any;
    candidate_name:any;
    mobile_number:any;
    email:any;
    qualifications:any=[];
    qualification_id:any;
    specializations:any=[];
    specialization_id:any;
    specialization:any;
    address:any;
    leads:any;
    leadform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetLeads();
        // this.GetCenters();
        this.GetQualifications();
        this.NewLeadForm();
    }  
    NewLeadForm(){
        this.leadform=this.fb.group({
            lead_id:[null],
            center_id:[null],
            candidate_name:[null],
            mobile_number:[null],
            email:[null],
            address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
        })
    }
    SubmitData(s){
        this.api.PostApi("leads",s).subscribe(e=>{
     //       console.log(e);
            this.NewLeadForm();
            // this.GetCenters();
            this.GetQualifications();
        })
    }
    GetLeads(){
        this.api.GetApi("leads").subscribe(e=>this.leads=e)  
    }
    /*GetCenters(){
        this.api.GetApi("center").subscribe(e=>this.centers=e)
    }
    GetCenter(c:any){
        this.api.GetApi("center?center_id="+c).subscribe(e=>this.centers=e)
    }*/
    GetQualifications(){
        this.api.GetApi("qualification").subscribe(e=>this.qualifications=e)
        this.specializations=[]
    }
    GetSpecializations(qid:any){
        this.api.GetApi("specialization?qualification_id="+qid).subscribe(e=>this.specializations=e)
    }
    CreateLead(lead_id,center_id,candidate_name,mobile_number,email,qualification_id,specialization_id,address){
        var cl={"lead_id":lead_id,"center_id":center_id,"candidate_name":candidate_name,"mobile_number":mobile_number,
        "email":email,"qualification_id":qualification_id,
        "specialization_id":specialization_id,"address":address
        }
        this.api.PostApi("leads",cl).subscribe(e=>console.log(e));

    }
} 