import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Placement.html'
})
export class PlacementClass{
    students:any;
    student_id:any;
    opening:any;
    registration:any;
    course:any;
    course_id:any;
    year_id:any;
    year:any; 
    openingform:FormGroup;
    placementform:FormGroup;
    placements:any;
    photo:any;
    server:any="http://localhost:8000/";
    displayopening:any="none";
    displayplacement:any="none";
    action:any="";

    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetOpenings();
        //this.GetStudents();
        this.GetCourses();
        this.NewOpeningForm();
        this.NewPlacementForm();
        this.GetPlacements();
    } 
    NewOpeningForm(){ 
        this.openingform=this.fb.group({
            opening_id:[null],
            company_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            opening_date:[null],
            requirements:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            qualification:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            percentage:[null,[Validators.compose([Validators.required,Validators.pattern("[0-9 ]*")])]],
            description:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z ]*")])]],
            address:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z0-9 ]*")])]]
        
        })
    }
    NewPlacementForm(){
        this.placementform=this.fb.group({
            select_id:[null],
            registeration_id:[null],
            course_id:[null],
            year_id:[null],
            company_name:[null],
            package:[null],
            placement_date:[null],
            pic:[null]
        })
    }
    SubmitData(s){
            switch(this.action){
                case "Add":
                {
                    this.api.PostApi("openings",s).subscribe(e=>{
                        alert(e.msg)
                        this.NewOpeningForm();
                        this.GetOpenings();
                        this.CloseModal();
                    })
                    break;
                }
            case "Update":
                {
                    this.api.PutApi("openings",s).subscribe(e=>{
                        alert(e.msg)
                        this.NewOpeningForm();
                        this.GetOpenings();
                        this.CloseModal();
                    })
                    break; 

                }
    } 
}
    SubmitPlacementData(s){
        switch(this.action){
            case "Add":
                {
                    var data=new FormData();
                    data.append("registeration_id",s.registeration_id)
                    data.append("company_name",s.company_name)
                    data.append("package",s.package)
                    data.append("placement_date",s.placement_date)
                    data.append("photo",this.photo[0])
                    this.api.PostApi("placements",data).subscribe(e=>{
                        alert(e.msg);
                        this.NewPlacementForm();
                        this.GetPlacements();
                        this.CloseModall();
                    }) 
                    
                    break; 

                }
            case "Update":
                {
                    var data=new FormData();
                    data.append("select_id",s.select_id)
                    data.append("registeration_id",s.registeration_id)
                    data.append("company_name",s.company_name)
                    data.append("package",s.package)
                    data.append("placement_date",s.placement_date)
                    data.append("photo",this.photo[0])
                    this.api.PutApi("placements",data).subscribe(e=>{
                        alert(e.msg);
                        this.NewPlacementForm();
                        this.GetPlacements();
                        this.photo=""
                        this.CloseModall();
                        
                    })
                    break; 

                }
        }

        
    } 

onSelectFile(e:any){
    this.photo=e;
    console.log(this.photo[0])
  }
GetCourses(){
    this.api.GetApi("courses").subscribe(e=>this.course=e)
}
GetYears(cid:any){
    this.api.GetApi("years?course_id="+cid).subscribe(e=>this.year=e)
}
GetOpenings(){
    this.api.GetApi("openings").subscribe(e=>this.opening=e)
}
GetStudents(yid:any){
    this.api.GetApi("student_details?year_id="+yid).subscribe(e=>this.students=e)
}
GetPlacements(){
    this.api.GetApi("placements").subscribe(e=>this.placements=e)
}
ViewOpeningForm(o){
    this.openingform=this.fb.group({
        opening_id:[o.opening_id],
        company_name:[o.company_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
        opening_date:[o.opening_date],
        requirements:[o.requirements,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
        qualification:[o.qualification,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
        percentage:[o.percentage,[Validators.compose([Validators.required,Validators.pattern("[0-9]+")])]],
        description:[o.description,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]],
        address:[o.address,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z0-9]+")])]]
    
    })
}
View(o){
    console.log(o)
      this.ViewOpeningForm(o);
      this.action="Update";
      this.displayopening="block"

  }
OpenModal(){
    this.NewOpeningForm();
    this.action="Add";
    this.displayopening="block"

}
CloseModal(){
    this.action="";
    this.displayopening="none"
}
Delete(o){
    this.api.DeleteApi("openings?opening_id="+o.opening_id).subscribe(e=>{
        alert(e.msg)
        this.GetOpenings();
      

   })
} 


ViewPlacementForm(o){
    this.placementform=this.fb.group({
        select_id:[o.select_id],
        registeration_id:[o.registeration_id],
        course_id:[o.course_id],
        year_id:[o.year_id],
        company_name:[o.company_name],
        package:[o.package],
        placement_date:[o.placement_date],
        pic:[this.photo]
    })
}
Vieww(o){
        console.log(o)
      this.ViewPlacementForm(o);
      this.action="Update";
      this.displayplacement="block"

  }
OpenModall(){
    this.NewPlacementForm();
    this.action="Add";
    this.displayplacement="block"

}
CloseModall(){
    this.action="";
    this.displayplacement="none"
}

Deletee(o){
    this.api.DeleteApi("placements?select_id="+o.select_id).subscribe(e=>{
        alert(e.msg)
        this.GetPlacements();
      

   })
} 

}  