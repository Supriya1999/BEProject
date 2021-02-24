import {Component} from '@angular/core'
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Enquiry.html'
})
export class EnquiryClass{
    qualifications:any=[];
    qualification_id:any;
    specializations:any=[];
    specialization_id:any;
    studentqualifications:any=[];
    medium:any;
    passing_year:any;
    percentage:any;
    university:any;
    cet_marks:any;
    pcm_marks:any;
    squalification:any;
    email_address:any;
    mobile_number:any;
    birth_date:any;
    local_address:any;
    annual_income:any;
    candidate_name:any;
    category:any;
    enquiryform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetQualifications();
        this.NewEnquiryForm();
    }  
    NewEnquiryForm(){ 
        this.enquiryform=this.fb.group({
            candidate_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            email_address:[null],
            mobile_number:[null],
            birth_date:[null],
            local_address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            annual_income:[null],

            

        })
    } 
    SubmitData(s){
        this.api.PostApi("student",s).subscribe(e=>{
    //       console.log(e);
            this.NewEnquiryForm();
        })
    }
    GetQualifications(){
        this.api.GetApi("qualification").subscribe(e=>this.qualifications=e)
        this.specializations=[]
    }
    GetSpecializations(qid:any){
        this.api.GetApi("specialization?qualification_id="+qid).subscribe(e=>this.specializations=e)
    }
    AddStudentQulification(q,s,m,u,y,p){
        this.studentqualifications.push({"qualifications":q,"specializations":s,"medium":m,"university":u,"passing_year":y,"percentage":p})
        this.medium=this.university=this.passing_year=this.percentage=null;
    }
}