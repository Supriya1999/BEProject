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
    studentform:FormGroup;

    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetStates();
        this.GetQualifications();
        this.GetCenters();
        this.NewStudentForm();
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
            email_addresss:[null]

            

        })
    }
    SubmitData(s){
        this.api.PostApi("student",s).subscribe(e=>{
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
        this.api.GetApi("center").subscribe(e=>this.centers=e)
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
    CreateStudent(first_name,middle_name,last_name,email_address,mobile_number,alternative_number,birth_date,state_id,location_id,city_id,local_address,permanent_address,center_id,father_name,father_number,mother_name,mother_number,occupation,annual_income,email_addresss){
                    var st={"first_name":first_name,"middle_name":middle_name,"last_name":last_name,"email_address":email_address,"mobile_number":mobile_number,"alternative_number":alternative_number,"birth_date":birth_date,"state_id":state_id,"location_id":location_id,"city_id":city_id,
                            "local_address":local_address,"permanent_address":permanent_address,"center_id":center_id,"father_name":father_name,"father_number":father_number,"mother_name":mother_name,"mother_number":mother_number,"occupation":occupation,"annual_income":annual_income,"email_addresss":email_addresss}
                    this.api.PostApi("student",st).subscribe(e=>console.log(e));
                }
}