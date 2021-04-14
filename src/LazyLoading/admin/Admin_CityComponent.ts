import {Component} from "@angular/core"
import {FormGroup,FormControl,Validators,FormBuilder,Validator} from "@angular/forms"
import {GenericApi} from "../APIS/GenericApi"
@Component({
    selector:'app-root',
    templateUrl:'Admin_City.html',
})
export class CityClass{

    cityform:FormGroup;
    states:any;
    cities:any;
    display:any="none"
    action:any=""
    msg:any;
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.GetStates();
        this.GetCities();
        this.NewCityForm();
    }
    NewCityForm(){
        this.cityform=this.fb.group({
            city_id:[null],
            city_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            state_id:[null]
        })
    } 
    AddCity(c){
        switch(this.action){
            case "Add":
                {
                    this.api.PostApi("city",c).subscribe(e=>{
                        alert(e.msg)
                        this.NewCityForm();
                        this.GetCities();
                        this.CloseModal();
                    }) 
            break;
                }
            case "Update":
                {
                    this.api.PutApi("city",c).subscribe(e=>{
                        //       console.log(e);
                        alert(e.msg)
                            this.NewCityForm();
                            this.GetCities();
                            this.CloseModal();
                        
                        })
                        break;
                }
        }
    }
    GetStates(){ 
        this.api.GetApi("state").subscribe(e=>this.states=e);
    }
    GetCities(){
        this.api.GetApi("city").subscribe(e=>this.cities=e);
    }
    ViewCityForm(s){
        this.cityform=this.fb.group({
            city_id:[s.city_id],
            city_name:[s.city_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
            state_id:[s.state_id]
        })
      
        // $("#exampleModalLabel").modal("show")
    }
    View(s){
        //  alert("")
          this.ViewCityForm(s);
          this.action="Update";
          this.display="block"
  
    }
    OpenModal(){
        this.NewCityForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(s){
        this.api.DeleteApi("city?city_id="+s.city_id).subscribe(e=>{
            alert(e.msg)
        //    this.NewQualificationForm();
           this.GetCities();
         
   
       })
    }
}