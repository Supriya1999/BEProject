import {Component} from '@angular/core'
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'NewRegistration.html'

})
export class NewRegistrationClass{
    states:any; 
    cities:any=[];
    locations:any=[];
    centers:any;
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
    first_name:any;
    middle_name:any;
    last_name:any;
    email_address:any;
    mobile_number:any;
    alternative_number:any;
    birth_date:any;
    state_id:any;
    location_id:any;
    city_id:any;
    local_address:any;
    permanent_address:any;
    center_id:any;
    father_name:any;
    father_number:any;
    mother_name:any;
    mother_number:any;
    occupation:any;
    annual_income:any;
    email_addresss:any;
    courses:any;
    years:any;
    category:any;
    studentform:FormGroup;
    course_id:any;
    year_id:any;
    category_id:any;
    course_fees:any;
    description:any;
    joining_date:any;
    payment_date:any;
    payment_mode:any;
    payment_type:any;
    ammount_paid:any;
    photo:any;

    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetStates();
        this.GetQualifications();
        this.GetCenters();
        this.NewStudentForm();
        this.GetCourses();
        this.GetCategory();
    }  
    NewStudentForm(){ 
        this.studentform=this.fb.group({
            student_id:[null],
            first_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            middle_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            last_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            email_address:[null],
            mobile_number:[null],
            alternative_number:[null],
            birth_date:[null],
            state_id:[null],
            city_id:[null],
            location_id:[null],
            local_address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            permanent_address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            center_id:[null],
            father_name:[null],
            father_number:[null],
            mother_name:[null],
            mother_number:[null],
            occupation:[null],
            annual_income:[null],
            email_addresss:[null],
            


            

        })
    }
    SubmitData(s){
        this.api.PostApi("student_details",s).subscribe(e=>{
     //       console.log(e);
            this.NewStudentForm();
            this.GetStates();
            this.GetCenters();
        })
    }
    GetStates(){
        this.api.GetApi("state").subscribe(e=>this.states=e)
        this.cities=[]
    }
    GetCities(cid:any){
        this.api.GetApi("city?state_id="+cid).subscribe(e=>this.cities=e)
        this.locations=[]
    }
    GetLocations(lid:any){
        this.api.GetApi("location?city_id="+lid).subscribe(e=>this.locations=e)
    }
    GetCenters(){
        this.api.GetApi("center_details").subscribe(e=>this.centers=e)
    }
    GetCourses(){
        this.api.GetApi("courses").subscribe(e=>this.courses=e)
    }
    GetYears(cid:any){
        this.api.GetApi("years?course_id="+cid).subscribe(e=>this.years=e)
        }
    GetCategory(){
        this.api.GetApi("category").subscribe(e=>this.category=e)
    }
    GetQualifications(){
        this.api.GetApi("qualification").subscribe(e=>this.qualifications=e)
        this.specializations=[]
    }
    GetSpecializations(q:any){
        var qdata=q.split("_")
        this.api.GetApi("specialization?qualification_id="+qdata[0]).subscribe(e=>this.specializations=e)
    }
    AddStudentQulification(q,s,m,u,y,p){
        var qdata=q.split("_")
        var sdata=s.split("_")
 
         this.studentqualifications.push({"qualification_id":qdata[0],"qualification_name":qdata[1],"specialization_id":sdata[0],"specialization_name":sdata[1],"medium":m,"university":u,"passing_year":y,"percentage":p})
         this.medium=this.university=this.passing_year=this.percentage=null;
    }
    CreateStudent(first_name,middle_name,last_name,email_address,mobile_number,alternative_number,birth_date,state_id,location_id,city_id,local_address,permanent_address,center_id,father_name,father_number,mother_name,mother_number,occupation,annual_income,email_addresss,year_id,category_id,course_fees,joining_date,description,payment_date,payment_mode,payment_type,ammount_paid,cet_marks,pcm_marks){
                    var st={"first_name":first_name,"middle_name":middle_name,"last_name":last_name,"email_address":email_address,"mobile_number":mobile_number,"alternative_number":alternative_number,"birth_date":birth_date,"state_id":state_id,"location_id":location_id,"city_id":city_id,
                            "local_address":local_address,"permanent_address":permanent_address,"center_id":center_id,"studentqualifications":this.studentqualifications,"father_name":father_name,"father_number":father_number,"mother_name":mother_name,"mother_number":mother_number,"occupation":occupation,"annual_income":annual_income,"email_addresss":email_addresss
                            ,"year_id":year_id,"category_id":category_id,"course_fees":course_fees,"joining_date":joining_date,"description":description,"payment_date":payment_date,"payment_mode":payment_mode,"payment_type":payment_type,"ammount_paid":ammount_paid,"cet_marks":cet_marks,"pcm_marks":pcm_marks}
                    var data=new FormData() 
                    data.append("first_name",st.first_name)
                    data.append("middle_name",st.middle_name)
                    data.append("last_name",st.last_name)
                    data.append("email_address",st.email_address)
                    data.append("mobile_number",st.mobile_number)
                    data.append("alternative_number",st.alternative_number)
                    data.append("birth_date",st.birth_date)
                    data.append("state_id",st.state_id)
                    data.append("location_id",st.location_id)
                    data.append("city_id",st.city_id)
                    data.append("local_address",st.local_address)
                    data.append("permanent_address",st.permanent_address)
                    data.append("center_id",st.center_id)
                    data.append("studentqualifications",JSON.stringify(st.studentqualifications))
                    data.append("photo",this.photo[0])
                    data.append("father_name",st.father_name)
                    data.append("father_number",st.father_number)
                    data.append("mother_name",st.mother_name)
                    data.append("mother_number",st.mother_number)
                    data.append("occupation",st.occupation)
                    data.append("annual_income",st.annual_income)
                    data.append("email_addresss",st.email_addresss)
                    data.append("year_id",st.year_id)
                    data.append("category_id",st.category_id)
                    data.append("course_fees",st.course_fees)
                    data.append("joining_date",st.joining_date)
                    data.append("description",st.description)
                    data.append("payment_date",st.payment_date)
                    data.append("payment_mode",st.payment_mode)
                    data.append("payment_type",st.payment_type)
                    data.append("ammount_paid",st.ammount_paid)
                    data.append("cet_marks",st.cet_marks)
                    data.append("pcm_marks",st.pcm_marks)
                    this.api.PostApi("student_details",data).subscribe(e=>console.log(e));
                   // this.first_name=this.middle_name=this.last_name=this.email_address=this.mobile_number=this.alternative_number=this.birth_date=this.state_id=this.location_id=this.city_id=this.local_address=this.permanent_address=this.center_id=this.father_name=this.father_number=this.mother_name=this.mother_number=this.occupation=this.annual_income=this.email_addresss=this.year_id=this.category_id=this.course_fees=this.joining_date=this.description=this.payment_date=this.payment_mode=this.payment_type=this.ammount_paid=this.cet_marks=this.pcm_marks=null;

            }
            onSelectFile(e:any){
                this.photo=e;
                //console.log(this.photo[0])
              }
        
}