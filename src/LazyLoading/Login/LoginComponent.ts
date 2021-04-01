import {Component} from "@angular/core"
import {Router} from "@angular/router"
@Component({
    selector:'app-root',
    templateUrl:'Login.html'
})
export class LoginClass{
    constructor(private rt:Router) {
        
    }
 Call(){
    this.rt.navigateByUrl("/admin")
 }
}