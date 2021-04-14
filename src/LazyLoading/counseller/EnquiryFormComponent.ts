import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'EnquiryForm.html'
})
export class EnquiryFormClass{
    categories:any;
    category_id:any;
    center_id:any;
    cet_marks:any;
    qualifications:any=[];
    qualification_id:any;
    specializations:any=[];
    specialization_id:any;
    studentqualifications:any=[];
    medium:any;
    passing_year:any;
    percentage:any;
    university:any;
    pcm_marks:any;
    candidate_name:any;
    email:any;
    mobile_number:any;
    birth_date:any;
    address:any;
    enquiry_date:any;
    annual_income:any;
    enquiryform:any;
    center:any;
    sources:any;
    technology:any;
    checkarraysource:any=[];
    checkarraytech:any=[];
    
    constructor(private api:GenericApi,private fb:FormBuilder){
        //this.GetStates();
        this.GetQualifications();
        this.GetCategories();
        this.NewEnquiryForm();
        this.GetSources();
        this.GetTechnology();
        this.GetCenter();
    }
    NewEnquiryForm(){
        this.enquiryform=this.fb.group({
            enquiry_id:[null],
            candidate_name:[null],
            birth_date:[null],
            enquiry_date:[null],
            mobile_number:[null],
            email:[null],
            annual_income:[null],
            center_id:[null],
            address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],

        })
    }
    SubmitData(s){
        this.api.PostApi("enquiry",s).subscribe(e=>{
     //       console.log(e);
            this.NewEnquiryForm();
            this.GetQualifications();
            this.GetCategories();
        })
    }
    GetQualifications(){
        this.api.GetApi("qualification").subscribe(e=>this.qualifications=e)
        this.specializations=[]
    }
    GetSpecializations(q:any){
        var qdata=q.split("_")
        this.api.GetApi("specialization?qualification_id="+qdata[0]).subscribe(e=>this.specializations=e)
    }
    GetCategories(){
        this.api.GetApi("category").subscribe(e=>this.categories=e)
    }
    GetCenter(){
        this.api.GetApi("center_details").subscribe(e=>this.center=e)

    }
    GetSources(){
        this.api.GetApi("leadsources").subscribe(e=>this.sources=e)
    }
    GetTechnology(){
        this.api.GetApi("technology").subscribe(e=>this.technology=e)
    }
    AddStudentQulification(q,s,m,u,y,p){
        var qdata=q.split("_")
        var sdata=s.split("_")
 
         this.studentqualifications.push({"qualification_id":qdata[0],"qualification":qdata[1],"specialization_id":sdata[0],"specialization":sdata[1],"medium":m,"university":u,"passing_year":y,"percentage":p})
         this.medium=this.university=this.passing_year=this.percentage=null;
    }
    
    GetSourceId(e){
        var i=this.checkarraysource.indexOf(e);
        if(i==-1){
            this.checkarraysource.push(e);
        }
        else{
            this.checkarraysource.splice(i,1);
        }
        console.log(this.checkarraysource)
    }
    
    GetTechnologyId(e){
        var i=this.checkarraytech.indexOf(e);
        if(i==-1){
            this.checkarraytech.push(e);
        }
        else{
            this.checkarraytech.splice(i,1);
        }
        console.log(this.checkarraytech)
    }
    CreateEnquiry(candidate_name,email	,mobile_number	,birth_date	,address,enquiry_date,category_id,annual_income,center_id,cet_marks,pcm_marks){
        var st ={"candidate_name":candidate_name,"email":email,"mobile_number":mobile_number,"birth_date":birth_date,
                "address":address,"enquiry_date":enquiry_date,"category_id":category_id,"annual_income":annual_income,"center_id":center_id,"studentqualifications":this.studentqualifications,"cet_marks":cet_marks,"pcm_marks":pcm_marks
                ,"source_id":this.checkarraysource,"technology_id":this.checkarraytech}
                this.api.PostApi("enquiry",st).subscribe(e=>console.log(e));
            this.candidate_name=this.mobile_number=this.birth_date=this.address=this.enquiry_date=this.category_id=this.annual_income=this.center_id=this.cet_marks=this.pcm_marks=this.checkarraysource=this.checkarraytech=null
    } 

} 