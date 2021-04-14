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
    qid:any;
    leadform:FormGroup; 
    display:any="none";
    action:any="";
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetLeads();
        this.GetCenters();
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
            qualification_id:[null],
            specialization_id:[null],
            address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
        })
    }
    SubmitData(s){
        switch(this.action){
            case "Add":
            {
                this.api.PostApi("leads",s).subscribe(e=>{
                            alert(e.msg)
                           this.NewLeadForm();
                           this.GetLeads();
                           this.CloseModal();
                       })
                       break;
                    }
            case "Update":
            {
                this.api.PutApi("leads",s).subscribe(e=>{
                            alert(e.msg)
                           this.NewLeadForm(); 
                           this.GetLeads();
                           this.CloseModal();
                       })
                       break;
                    }
        }
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
    GetCenters(){
        this.api.GetApi("center_details").subscribe(e=>this.centers=e)
    }
    CreateLead(lead_id,center_id,candidate_name,mobile_number,email,qualification_id,specialization_id,address){
        var cl={"lead_id":lead_id,"center_id":center_id,"candidate_name":candidate_name,"mobile_number":mobile_number,
        "email":email,"qualification_id":qualification_id,
        "specialization_id":specialization_id,"address":address
        }
        this.api.PostApi("leads",cl).subscribe(e=>console.log(e));
        this.lead_id=this.center_id=this.candidate_name=this.mobile_number=this.email=this.qualification_id=this.specialization_id=this.address=null;
    }
    ViewLeadForm(q){
        this.leadform=this.fb.group({
            lead_id:[q.lead_id],
            center_id:[q.center_id],
            candidate_name:[q.candidate_name],
            mobile_number:[q.mobile_number],
            email:[q.email],
            qualification_id:[q.qualification_id],
            specialization_id:[q.specialization_id],
            address:[q.address,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
        })
    }

    View(q){
        console.log(q)
          this.ViewLeadForm(q);
          this.action="Update";
          this.display="block"
  
      }  
    OpenModal(){
        this.NewLeadForm();
        this.action="Add";
        this.display="block"

     }
    CloseModal(){
        this.action="";
        this.display="none"
     }
    Delete(q){
        this.api.DeleteApi("leads?lead_id="+q.lead_id).subscribe(e=>{
            alert(e.msg)
            this.GetLeads();
          
   
       })
    } 
} 