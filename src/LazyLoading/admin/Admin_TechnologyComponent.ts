import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Technology.html',
})
export class TechnologyClass{
    technology:any;
    display:any="none"
    action:any=""
    technologyform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetTechnology();
        this.NewTechnologyForm();
    }
    NewTechnologyForm(){ 
        this.technologyform=this.fb.group({
            technology_id:[null],
            technology_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
    }
    SubmitData(s){
        switch(this.action)
        {
            case "Add":
                {
                    this.api.PostApi("technology",s).subscribe(e=>{
                        //       console.log(e);
                               this.NewTechnologyForm();
                               this.GetTechnology();
                               this.CloseModal();
                           })
                }
                break;
                case "Update":
        {
this.api.PutApi("technology",s).subscribe(e=>{
    alert(e.msg);
    this.NewTechnologyForm();
    this.GetTechnology();
    this.CloseModal();
})
break;
}
        }
    }
    GetTechnology(){
        this.api.GetApi("technology").subscribe(e=>this.technology=e)
    }
    ViewTechnologyForm(s){
        this.technologyform=this.fb.group({
            technology_id:[s.technology_id],
            technology_name:[s.technology_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
      
        // $("#exampleModalLabel").modal("show")
    }
    View(s){
        //  alert("")
          this.ViewTechnologyForm(s);
          this.action="Update";
          this.display="block"
  
      }
    OpenModal(){
        this.NewTechnologyForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(s){
        this.api.DeleteApi("technology?technology_id="+s.technology_id).subscribe(e=>{
            alert(e.msg)
        //    this.NewQualificationForm();
           this.GetTechnology();
         
   
       })
    }
}