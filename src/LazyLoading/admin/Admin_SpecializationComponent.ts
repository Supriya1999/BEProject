import {Component} from "@angular/core"
import {FormGroup,FormBuilder,Validators} from "@angular/forms"
import {GenericApi} from "../APIS/GenericApi"

@Component({
    selector:'app-root',
    templateUrl:'Admin_Specialization.html',
})
export class SpecializationClass{
    specializationform:FormGroup
    qualification:any;
    specialization:any;
    display:any="none"
    action:any=""
    msg:any;
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewSpecializationForm();
        this.GetQualification();
        this.GetSpecialization();
    }
    NewSpecializationForm(){
        this.specializationform=this.fb.group({
            specialization_id:[],
            specialization:[],
            qualification_id:[]
        })
    }
    GetQualification(){
        this.api.GetApi("qualification").subscribe(e=>this.qualification=e);
    }
    GetSpecialization(){
        this.api.GetApi("specialization").subscribe(e=>this.specialization=e);

    }
    AddSpecialization(s:any){
      //  console.log(s)
      switch(this.action)
      {
          case "Add":
              {
                this.api.PostApi("specialization",s).subscribe(e=>{
                    alert(e.msg)
                    this.NewSpecializationForm();
                    this.GetSpecialization();
                    this.CloseModal();
                }) 
                break;
              }
              case "Update":
                {
        
        this.api.PutApi("specialization",s).subscribe(e=>{
        //       console.log(e);
        alert(e.msg)
            this.NewSpecializationForm();
            this.GetSpecialization();
            this.CloseModal();
        
        })
        break;
      }
        }
    }
    ViewSpecializationForm(s){
        this.specializationform=this.fb.group({
            specialization_id:[s.specialization_id],
            specialization:[s.specialization,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            qualification_id:[s.qualification_id]
        })
      
        // $("#exampleModalLabel").modal("show")
    }
    View(s){
      //  alert("")
        this.ViewSpecializationForm(s);
        this.action="Update";
        this.display="block"

    }
    OpenModal(){
        this.NewSpecializationForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(s){
        this.api.DeleteApi("specialization?specialization_id="+s.specialization_id).subscribe(e=>{
            alert(e.msg)
        //    this.NewSpecializationForm();
           this.GetSpecialization();
         
   
       })
    }

    
} 