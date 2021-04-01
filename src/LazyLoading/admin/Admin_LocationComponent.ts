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
    display:any="none"
    action:any=""
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
    //console.log(c)
    switch(this.action)
    {
        case "Add":
            {
                this.api.PostApi("location",c).subscribe(e=>{
                    alert(e.msg)
                    this.NewLocationForm();
                    this.GetLocations();
                    this.CloseModal();
                }) 
                break;
            }
            case "Update":
                {
        
        this.api.PutApi("location",c).subscribe(e=>{
        //       console.log(e);
        alert(e.msg)
            this.NewLocationForm();
            this.GetLocations();
            this.CloseModal();
        
        })
        break;
    }
}

}
ViewLocationForm(s){
    this.locationform=this.fb.group({
        location_id:[s.location_id],
        location_name:[s.location_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
        state_id:[s.state_id],
        city_id:[s.city_id]
    })
  
    // $("#exampleModalLabel").modal("show")
}
View(s){
  //  alert("")
    this.ViewLocationForm(s);
    this.action="Update";
    this.display="block"

}
OpenModal(){
    this.NewLocationForm();
    this.action="Add";
    this.display="block"

}
CloseModal(){
    this.action="";
    this.display="none"
}
Delete(s){
    this.api.DeleteApi("location?location_id="+s.location_id).subscribe(e=>{
        alert(e.msg)
    //    this.NewLocationForm();
       this.GetLocations();
     

   })
}
}