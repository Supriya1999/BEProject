import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,Validators, FormBuilder} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Lead.html',
})
export class DemoClass{

    leads:any; 
    display:any="none"
    action:any=""
    demoForm:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetLeads();
        this.NewLeadForm();
    } 
    NewLeadForm(){ 
        this.demoForm=this.fb.group({
            source_id:[null],
            source_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    SubmitData(s){
        switch(this.action)
        {
            case "Add":
                {
                    this.api.PostApi("leadsources",s).subscribe(e=>{
                        //console.log(e);
                           this.NewLeadForm();
                           this.GetLeads();
                           this.CloseModal();
                       })
                       break;
                }
            case "Update":
                {
            
            this.api.PutApi("leadsources",s).subscribe(e=>{
            //       console.log(e);
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
             this.api.GetApi("leadsources").subscribe(e=>this.leads=e)
         }
         ViewLeadForm(s){
            this.demoForm=this.fb.group({
                source_id:[s.source_id],
                source_name:[s.source_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
            })
          
            // $("#exampleModalLabel").modal("show")
        }
        View(s){
          //  alert("")
            this.ViewLeadForm(s);
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
        Delete(s){
            this.api.DeleteApi("leadsources?source_id="+s.source_id).subscribe(e=>{
                alert(e.msg)
            //    this.NewleadsourcesForm();
               this.GetLeads();
             
       
           })
        }
   
}



