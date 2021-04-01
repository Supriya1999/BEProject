import {Component} from "@angular/core"
import { FormBuilder } from "@angular/forms";
import {ActivatedRoute} from "@angular/router" 
import { GenericApi } from "../APIS/GenericApi";
@Component({
    selector:'app-root',
    templateUrl:'EnquiryView.html',
})
export class EnquiryViewClass{
     id:any=0;
     s:any; 
     qualifications:any;
     constructor(private rt:ActivatedRoute,private api:GenericApi,private fb:FormBuilder)
    {
        this.rt.params.subscribe(e=>{
            this.id=e["id"]
        })
        this.GetEnquiryById(this.id)
    }
    GetEnquiryById(id){
        this.api.GetApi("enquiry?enquiry_id="+id).subscribe(e=>this.s=e)
    }
}