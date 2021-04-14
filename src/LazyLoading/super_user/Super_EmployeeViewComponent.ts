import { templateJitUrl } from "@angular/compiler"
import {Component} from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms";
import {ActivatedRoute} from "@angular/router" 
import { GenericApi } from "../APIS/GenericApi";
import {Validators,Validator, Form} from "@angular/forms"

@Component({
    
    selector:'app-root',
    templateUrl:'Super_EmployeeView.html',
})
export class SuperUserEmployeeViewClass{
     id:any=0;
     qid:any
     s:any;
     qualifications:any;
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
   cid:any;
   sid:any;
    msg:any;
     profileform:FormGroup;
     salaryform:FormGroup;
     qualificationform:FormGroup;
     documentform:FormGroup;
     displaysalary:any="none"
     displayprofile:any="none";
     displayqualification:any="none";
     displaydocument:any="none";
     action=""
     server:any="http://localhost:8000/"
     path:any="static/Multimedia"
     constructor(private rt:ActivatedRoute,private api:GenericApi,private fb:FormBuilder)
    {
        this.rt.params.subscribe(e=>{
            this.id=e["id"]
        })
        this.GetStates();
        this.GetQualifications();
        this.GetRole();
        this.GetCenters();
        
        this.GetEmployeeById(this.id)
        this.NewProfileForm();
        this.NewSalaryForm();
        this.NewDocumentForm();
        this.NewQualificationForm();
    }
    NewSalaryForm()
    {
            this.salaryform=this.fb.group({
                salary_id:[null],
                employee_id:[null],
                salary_date:[null],
                actual_salary:[null],
                incentive_amount:[null],
                tax_deduction:[null],
                total_present_days:[null]
            })
    }
    
    NewQualificationForm(){
        this.qualificationform=this.fb.group({
            employee_qualification_id:[null],
            employee_id:[null],
            qualification_id:[null],
            specialization_id:[null],
            medium:[null],
            university:[null],
            passing_year:[null],
            percentage:[null],
        })
    }
    
    NewDocumentForm(){
        this.documentform=this.fb.group({
            document_id:[null],
            employee_id:[null],
            document_name:[null],
            image_name:[null]
        })
    }    
    NewProfileForm(){
        this.profileform=this.fb.group({
            employee_id:[null],
            employee_code:[null],
            first_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]")])]],
            middle_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            last_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            email_address:[null],
            mobile_number:[null],
            birth_date:[null],
            joining_date:[null],
            role_id:[null],
            state_id:[null],
            city_id:[null],
            location_id:[null],
            local_address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            permanent_address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            center_id:[null]
        })
    }
    GetEmployeeById(id){
        this.api.GetApi("employee_details?employee_id="+id).subscribe(e=>this.s=e)
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
    GetSpecializations(qid:any){
        this.api.GetApi("specialization?qualification_id="+qid).subscribe(e=>this.specialization=e);
    }
    SubmitProfileData(s)
    {
        var data=new FormData();
        data.append("employee_id",s.employee_id)
        data.append("first_name",s.first_name)
        data.append("middle_name",s.middle_name)
        data.append("last_name",s.last_name)
        data.append("birth_date",s.birth_date)
        data.append("joining_date",s.joining_date)
        data.append("role_id",s.role_id)
        data.append("mobile_number",s.mobile_number)
        data.append("email_address",s.email_address)
        data.append("center_id",s.center_id)
        data.append("location_id",s.location_id)
        data.append("local_address",s.local_address)
        data.append("permanent_address",s.permanent_address)
        if(this.photo==null)
        {
            data.append("photo","")
        }
        else
        {
            data.append("photo",this.photo[0])
        }
        this.api.PutApi("employee_details",data).subscribe(e=>{
            alert(e.msg);
            this.GetEmployeeById(this.id);
            this.CloseProfileModal();
        });
    }
    ViewProfileForm(s){
        this.profileform=this.fb.group({
            employee_id:[s.employee_id],
            employee_code:[s.employee_code],
            first_name:[s.first_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            middle_name:[s.middle_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            last_name:[s.last_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            email_address:[s.email_address],
            mobile_number:[s.mobile_number],
            birth_date:[s.birth_date],
            joining_date:[s.joining_date],
            role_id:[s.role_id],
            state_id:[s.state_id],
            city_id:[s.city_id],
            location_id:[s.location_id],
            local_address:[s.local_address,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            permanent_address:[s.permanent_address,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            center_id:[s.center_id]
        })
    }    
    ViewProfile(s){
        console.log(s);
        this.ViewProfileForm(s);
        this.displayprofile="block"
    }
    CloseProfileModal(){
        this.displayprofile="none"
    }
    onSelectFile(e:any){
        this.photo=e;
        console.log(this.photo[0])
    }
    SubmitSalaryData(s)
    {
        switch(this.action)
        {
            case "Add":
            {
                var data=new FormData()
                data.append("employee_id",this.id)
                data.append("salary_date",s.salary_date)
                data.append("actual_salary",s.actual_salary)
                data.append("incentive_amount",s.incentive_amount)
                data.append("tax_deduction",s.tax_deduction)
                data.append("total_present_days",s.total_present_days)
                this.api.PostApi("employee_salary_details",data).subscribe(e=>{
                    alert(e.msg)
                    this.GetEmployeeById(this.id)
                    this.CloseSalaryModal()
                })
            }
            break;
            case "Update":
            {
                var data=new FormData()
                data.append("salary_id",s.salary_id)
                data.append("salary_date",s.salary_date)
                data.append("actual_salary",s.actual_salary)
                data.append("incentive_amount",s.incentive_amount)
                data.append("tax_deduction",s.tax_deduction)
                data.append("total_present_days",s.total_present_days)
                this.api.PutApi("employee_salary_details",data).subscribe(e=>{
                alert(e.msg)
                this.GetEmployeeById(this.id)
                this.CloseSalaryModal()
                })
            }
            break;
        }
}
    ViewSalaryForm(s){
        this.salaryform=this.fb.group({
            salary_id:[s.salary_id],
            employee_id:[s.employee_id],
            salary_date:[s.salary_date],
            actual_salary:[s.actual_salary],
            incentive_amount:[s.incentive_ammount],
            tax_deduction:[s.tax_deduction],
            total_present_days:[s.total_present_days],
        })
    }    
    ViewSalary(s){
        console.log(s);
        this.ViewSalaryForm(s);
        this.displaysalary="block"
        this.action="Update"
    }
    CloseSalaryModal(){
        this.displaysalary="none"
    }
    
    OpenSalaryModal(){
        this.displaysalary="block";
        this.action="Add";
        this.NewSalaryForm();
    }
    DeleteSalary(s){
        this.api.DeleteApi("employee_salary_details?salary_id="+s.salary_id).subscribe(e=>{
            alert(e.msg)
            this.GetEmployeeById(this.id);
          
   
       })
    }
    SubmitQualificationData(q){
        switch(this.action)
        {
            case "Add":
                var data=new FormData();
                data.append("employee_id",this.id)
                data.append("specialization_id",q.specialization_id)
                data.append("medium",q.medium)
                data.append("university",q.university)
                data.append("passing_year",q.passing_year)
                data.append("percentage",q.percentage)
                this.api.PostApi("employee_qualification",data).subscribe(e=>{
                    alert(e.msg)
                    this.NewQualificationForm();
                    this.GetEmployeeById(this.id) 
                    this.CloseQualificationModal();
                })
                break;
            case "Update":
                var data=new FormData();
                data.append("employee_qualification_id",q.employee_qualification_id)
                data.append("specialization_id",q.specialization_id)
                data.append("medium",q.medium)
                data.append("university",q.university)
                data.append("passing_year",q.passing_year)
                data.append("percentage",q.percentage)
                this.api.PutApi("employee_qualification",data).subscribe(e=>{
                    alert(e.msg)
                    this.NewQualificationForm();
                    this.GetEmployeeById(this.id) 
                    this.CloseQualificationModal();
                })
                break;
        }
    }
    ViewQualificationForm(q){
        this.qualificationform=this.fb.group({
            employee_qualification_id:[q.employee_qualification_id],
            employee_id:[q.employee_id],
            qualification_id:[q.qualification_id],
            specialization_id:[q.specialization_id],
            medium:[q.medium],
            university:[q.university],
            passing_year:[q.passing_year],
            percentage:[q.percentage],
        })
    }
    ViewQualification(q){
        console.log(q);
        this.ViewQualificationForm(q);
        this.displayqualification="block"
        this.action="Update"

    }
    CloseQualificationModal(){
        this.displayqualification="none" 
    }
    OpenQualificationModal(){
        this.NewQualificationForm()
        this.action="Add"
        this.displayqualification="block"   
    }
    DeleteQualification(q){
        this.api.DeleteApi("employee_qualification?employee_qualification_id="+q.employee_qualification_id).subscribe(e=>{
            alert(e.msg)
            this.GetEmployeeById(this.id);
          
   
       })
    }
    
    SubmitDocumentData(s){
        switch(this.action)
        {
            case "Add":
            {
                var data=new FormData();
                data.append("employee_id",this.id)
                data.append("document_name",s.document_name)
                data.append("photo",this.photo[0])
                this.api.PostApi("employee_document",data).subscribe(e=>{
                    alert(e.msg)
                    this.NewDocumentForm();
                    this.GetEmployeeById(this.id) 
                    this.CloseDocumentModal();
                })
            }
            break;
            case "Update":
            {
                var data=new FormData();
                data.append("document_id",s.document_id)
                data.append("document_name",s.document_name)
                if(this.photo==null)
                {
                    data.append("photo","")
                }
                else
                {
                   data.append("photo",this.photo[0])
                }
                this.api.PutApi("employee_document",data).subscribe(e=>{
                    alert(e.msg)
                    this.NewDocumentForm();
                    this.GetEmployeeById(this.id) 
                    this.CloseDocumentModal();
                })
            }
            break;
        }
    }
    ViewDocumentForm(d){
        this.documentform=this.fb.group({
            document_id:[d.document_id],
            employee_id:[d.employee_id],
            document_name:[d.document_name],
            image_name:[d.image_name],
        })
    }    
    ViewDocument(d){
        console.log(d);
        this.ViewDocumentForm(d);
        this.displaydocument="block"
        this.action="Update"
    }
    CloseDocumentModal(){
        this.displaydocument="none"
    }
    
    OpenDocumentModal(){
        this.displaydocument="block";
        this.action="Add";
        this.NewDocumentForm();
    }
    DeleteDocument(d){
        this.api.DeleteApi("employee_document?document_id="+d.document_id).subscribe(e=>{
            alert(e.msg)
            this.GetEmployeeById(this.id);
          
   
       })
    }
}