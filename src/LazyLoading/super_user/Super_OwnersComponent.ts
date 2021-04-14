import { templateJitUrl } from "@angular/compiler"
import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormBuilder,Validators} from "@angular/forms"

@Component({
    selector:'app-root',
    templateUrl:'Super_Owners.html',
})
export class SuperUserOwnersClass{
    ownerform:FormGroup;
    owner:any;
    center:any;
    photo:any;
    qualification:any;
    specialization:any[];
    states:any;
    cities:any[];
    locations:any[];
    sid:any;
    qid:any;
    msg:any;
    server:any="http://localhost:8000/";
    display:any="none"
    action:any=""
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewOwnerForm();
        this.GetOwner();
        this.GetCenters();
        this.GetStates();
        this.GetQualifications();
       
        
}
NewOwnerForm(){
       
    this.ownerform=this.fb.group({
        
        owner_id:[],
        owner_name:[],
        center_id:[],
        address:[],
        mobile_number:[],
        specialization_id:[],
        city_id:[],
        email_address:[],
        qualification_id:[],
        state_id:[],
        photo:[]
        
    })    
}
GetOwner(){
    this.api.GetApi("owner_details").subscribe(e=>this.owner=e)
}
GetCenters(){
    this.api.GetApi("center_details").subscribe(e=>this.center=e)
}
GetStates(){
    this.api.GetApi("state").subscribe(e=>this.states=e);
    this.cities=[];
    this.locations=[];
}
GetCities(sid:any){
    this.api.GetApi("city?state_id="+sid).subscribe(e=>this.cities=e);
    this.locations=[];
}
GetQualifications(){
    this.api.GetApi("qualification").subscribe(e=>this.qualification=e); 
    this.specialization=[];
}
GetSpecializations(qid:any){
    this.api.GetApi("specialization?qualification_id="+qid).subscribe(e=>this.specialization=e);
}
AddOwner(s){
    switch(this.action){
        case "Add":
        {   
            var data =new FormData();
            data.append("owner_id",s.owner_id)
            data.append("owner_name",s.owner_name)
            data.append("center_id",s.center_id)
            data.append("address",s.address)
            data.append("mobile_number",s.mobile_number)
            data.append("specialization_id",s.specialization_id)
            data.append("city_id",s.city_id)
            data.append("email_address",s.email_address)
            data.append("state_id",s.state_id)
            data.append("qualification_id",s.qualification_id)
            data.append("photo",this.photo[0])
            this.api.PostApi("owner_details",data).subscribe(e=>{
                alert(e.msg)
                this.NewOwnerForm();
                this.GetOwner();
                this.photo=null;
                this.CloseModal();
                
            })
            break;      
        }
        case "Update":
        {
            var data =new FormData();
            data.append("owner_id",s.owner_id)
            data.append("owner_name",s.owner_name)
            data.append("center_id",s.center_id)
            data.append("address",s.address)
            data.append("mobile_number",s.mobile_number)
            data.append("specialization_id",s.specialization_id)
            data.append("city_id",s.city_id)
            data.append("email_address",s.email_address)
            data.append("state_id",s.state_id)
            data.append("qualification_id",s.qualification_id)
            if (this.photo==null)
            { 
                 data.append("photo","")
            }
            else
            {
                 data.append("photo",this.photo[0])
            }
            this.api.PutApi("owner_details",data).subscribe(e=>{
                alert(e.msg)
                this.NewOwnerForm();
                this.GetOwner();
                
                this.CloseModal();
            })
            break;    
        }
    }
    
        
    
}
onSelectFile(e:any){
    this.photo=e;
    console.log(this.photo[0])
  }
ViewOwnerForm(o){
    this.ownerform=this.fb.group({
        owner_id:[o.owner_id],
        owner_name:[o.owner_name],
        center_id:[o.center_id],
        address:[o.address],
        mobile_number:[o.mobile_number],
        specialization_id:[o.specialization_id],
        city_id:[o.city_id],
        email_address:[o.email_address],
        qualification_id:[o.qualification_id],
        state_id:[o.state_id],
        
        
    })
}
View(o){
    console.log(o)
      this.ViewOwnerForm(o);
      this.action="Update";
      this.display="block"

  }
OpenModal(){
    this.NewOwnerForm();
    this.action="Add";
    this.display="block"

}
CloseModal(){
    this.action="";
    this.display="none"
}
Delete(o){
    this.api.DeleteApi("owner_details?owner_id="+o.owner_id).subscribe(e=>{
        alert(e.msg)
        this.GetOwner();
    })
}   
}
