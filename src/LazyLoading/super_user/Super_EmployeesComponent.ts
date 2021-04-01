import { templateJitUrl } from "@angular/compiler"
import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormBuilder,Validators} from "@angular/forms"

@Component({
    selector:'app-root',
    templateUrl:'Super_Employees.html',
})
export class SuperUserEmployeesClass{
    
    
    employee_id:any;
    employee_code:any;
    first_name:any;
    middle_name:any;
    last_name:any;
    birth_date:any;
    joining_date:any;
    mobile_number:any;
    email_address:any;
    photo:any;
    role_id:any;
    location_id:any;
    permanent_address:any;
    local_address:any;
    center_id:any;
    employee:any;
    centers:any[];
    states:any;
    cities:any=[];
    locations:any=[];
    role:any;
    qualification:any;
    qualification_id:any;
    specialization_id:any;
    specialization:any=[];
    qualifications:any=[];
    medium:any;
    university:any;
    year:any;
    percentage:any;
    documents:any=[];
    document_name:any;
    image_name:any;
    salary:any=[];
    salary_date:any;
    actual_salary:any;
    incentive_amount:any;
    tax_deduction:any;
    total_present_days:any;
    state_id:any;
    city_id:any;
    multiplephoto:any=[]
   imgname:any;
    msg:any;
    constructor(private api:GenericApi){
        
       
        this.GetStates();
        this.GetQualifications();
        this.GetRole();
        this.GetCenters();
        
}
GetCenters(){
    this.api.GetApi("center_details").subscribe(e=>this.centers=e)
}

GetStates(){
    this.api.GetApi("state").subscribe(e=>this.states=e);
    this.cities=[];
    this.locations=[];
}
GetLocations(cid:any){
    this.api.GetApi("location?city_id="+cid).subscribe(e=>this.locations=e);
}
GetCities(sid:any){
    
    this.api.GetApi("city?state_id="+sid).subscribe(e=>this.cities=e);
    this.locations=[];
}
GetRole(){
    this.api.GetApi("role").subscribe(e=>this.role=e);
}
GetQualifications(){
    this.api.GetApi("qualification").subscribe(e=>this.qualification=e); 
    this.specialization=[];
}
GetSpecializations(q:any){
    var qdata=q.split("_")
    this.api.GetApi("specialization?qualification_id="+qdata[0]).subscribe(e=>this.specialization=e);
}

AddQulification(q,s,m,u,y,p){
    var qdata=q.split("_")
    var sdata=s.split("_")

     this.qualifications.push({"qualification_id":qdata[0],"qualification_name":qdata[1],"specialization_id":sdata[0],"specialization_name":sdata[1],"medium":m,"university":u,"year":y,"percentage":p})
     this.medium=this.university=this.year=this.percentage=null;
} 
AddDocuments(dn){
   console.log(dn)
   console.log(this.imgname)
   this.multiplephoto.push(this.imgname)
    this.documents.push({"document_name":dn,"image_name":this.imgname.name,"image":this.imgname})
}

AddEmployee(first_name,middle_name,last_name,birth_date,joining_date,mobile_number,email_address,role_id,state_id,city_id,location_id,permanent_address,local_address,center_id,photo,salary_date,actual_salary,incentive_amount,tax_deduction,total_present_days){
    //console.log(c)
    var st={"first_name":first_name,"middle_name":middle_name,"last_name":last_name,"birth_date":birth_date,"joining_date":joining_date,"mobile_number":mobile_number,"email_address":email_address,"role_id":role_id,"state_id":state_id,"city_id":city_id,"location_id":location_id,"permanent_address":permanent_address,"local_address":local_address,"center_id":center_id,"photo":photo,"qualifications":this.qualifications,"documents":this.documents,"salary_date":salary_date,"actual_salary":actual_salary,"incentive_amount":incentive_amount,"tax_deduction":tax_deduction,"total_present_days":total_present_days};
    var data=new FormData() 
    data.append("first_name",st.first_name)
    data.append("middle_name",st.middle_name)
    data.append("last_name",st.last_name)
    data.append("birth_date",st.birth_date)
    data.append("joining_date",st.joining_date)
    data.append("mobile_number",st.mobile_number)
    data.append("email_address",st.email_address)
    data.append("role_id",st.role_id)
    data.append("state_id",st.state_id)
    data.append("city_id",st.city_id)
    data.append("location_id",st.location_id)
    data.append("local_address",st.local_address)
    data.append("permanent_address",st.permanent_address)
    data.append("center_id",st.center_id)
    data.append("photo",this.photo[0])
    data.append("qualifications",JSON.stringify(st.qualifications))
    data.append("documents",JSON.stringify(st.documents))               
    data.append("salary_date",st.salary_date)
    data.append("actual_salary",st.actual_salary)
    data.append("tax_deduction",st.tax_deduction)
    data.append("incentive_amount",st.incentive_amount)               
    data.append("total_present_days",st.total_present_days)
    data.append("multiple_images", this.multiplephoto)

    this.api.PostApi("employee_details",data).subscribe(e=>console.log(e));
        
    this.first_name=this.middle_name=this.last_name=this.birth_date=this.joining_date=this.mobile_number=this.email_address,this.permanent_address=this.local_address=this.salary_date=this.actual_salary=this.incentive_amount=this.tax_deduction=this.total_present_days=null; 
    
    }
    onSelectFile(e:any){
                this.photo=e;
                
                console.log(this.photo[0])
    }
    
    onSelectMultipleFile(e:any){
        this.imgname=e[0]
        // console.log(e[0].name)
  
        
        // console.log(this.multiplephoto[0])
}

}  
