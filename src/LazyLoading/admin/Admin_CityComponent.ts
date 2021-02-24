import {Component} from "@angular/core"
import {FormGroup,FormBuilder,Validators} from "@angular/forms"
import {GenericApi} from "../APIS/GenericApi"
@Component({
    selector:'app-root',
    templateUrl:'Admin_City.html',
})
export class CityClass{

    cityform:FormGroup;
    states:any;
    cities:any;
    msg:any;
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewCityForm();
        this.GetStates();
        this.GetCities();
    }
    NewCityForm(){
        this.cityform=this.fb.group({
            city_id:[],
            city_name:[],
            state_id:[]
        })
    }
    GetStates(){
        this.api.GetApi("state").subscribe(e=>this.states=e);
    }
    GetCities(){
        this.api.GetApi("city").subscribe(e=>this.cities=e);
    }
    AddCity(c:any){
    console.log(c)
    this.api.PostApi("city",c).subscribe(e=>{
        this.msg=e;
        this.NewCityForm();
        this.GetCities();
    }) 
    }
}