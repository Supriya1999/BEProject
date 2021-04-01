import {Component} from "@angular/core"
import {GenericApi} from "../APIS/GenericApi"
import {FormGroup,FormControl,Validators, FormBuilder,Validator} from "@angular/forms"
@Component({
    selector:'app-root',
    templateUrl:'Admin_Category.html',
})
export class CategoryClass{
    category:any; 
    display:any="none"
    action:any=""
    categoryform:FormGroup;
    constructor(private api:GenericApi,private fb:FormBuilder){
        this.GetCategory();
        this.NewCategoryForm();
    } 
    NewCategoryForm(){ 
        this.categoryform=this.fb.group({
            category_id:[null],
            category_name:[null,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z0-9]+")])]]
        })
    }
    GetCategory(){
        this.api.GetApi("category").subscribe(e=>this.category=e)
    }
    SubmitData(s){

        switch(this.action)
        {
            case "Add":
                {
                    this.api.PostApi("category",s).subscribe(e=>{
                        //       console.log(e);
                               this.NewCategoryForm();
                               this.GetCategory();
                               this.CloseModal();
                           })
            break;
                }
            case "Update":
                {
                    this.api.PutApi("category",s).subscribe(e=>{
                        //       console.log(e);
                        alert(e.msg)
                            this.NewCategoryForm();
                            this.GetCategory();
                            this.CloseModal();
                })
                break;

        }
        
        }
    }
    ViewCategoryForm(s){
        this.categoryform=this.fb.group({
            category_id:[s.category_id],
            category_name:[s.category_name,[Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]+")])]]
        })
      
        // $("#exampleModalLabel").modal("show")
    }
    View(s){
      //  alert("")
        this.ViewCategoryForm(s);
        this.action="Update";
        this.display="block"

    }
    OpenModal(){
        this.NewCategoryForm();
        this.action="Add";
        this.display="block"

    }
    CloseModal(){
        this.action="";
        this.display="none"
    }
    Delete(s){
        this.api.DeleteApi("category?category_id="+s.category_id).subscribe(e=>{
            alert(e.msg)
        //    this.NewCategoryForm();
           this.GetCategory();
         
   
       })
    }
}