import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormBuilder,Validators} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Location.html',
})
export class LocationClass{

    locationform:FormGroup;
    states:any;
    cities:any;
    locations:any;
    sid:any;
    msg:any;
    constructor(private fb:FormBuilder,private api:GenericApi){
        this.NewLocationForm();
        // this.GetCities();
        this.GetStates();
        this.GetLocations();
    }
NewLocationForm(){
    this.locationform=this.fb.group({
        location_id:[],
        location_name:[],
        state_id:[],
        city_id:[]
    })
}
GetStates(){
    this.api.GetApi("state").subscribe(e=>this.states=e);
}
GetLocations(){
    this.api.GetApi("location").subscribe(e=>this.locations=e);
}
GetCities(sid:any){
    
    this.api.GetApi("city?state_id="+sid).subscribe(e=>this.cities=e);
}
AddLocation(c:any){
    console.log(c)
    this.api.PostApi("location",c).subscribe(e=>{
        this.msg=e;
        this.GetLocations();
    })
}

}