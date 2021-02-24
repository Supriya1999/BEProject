import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import { FormsModule,ReactiveFormsModule} from "@angular/forms"
import {MainClass} from "./MainComponent"
import {HomeClass} from "./Home/HomeComponent"
import {LoginClass} from "./Login/LoginComponent"
import { Routes,RouterModule, Router } from "@angular/router"
import { AdminMainClass } from "./admin/AdminComponent"
import {DashboardClass} from "./admin/Admin_DashboardComponent"
import {QualificationClass} from "./admin/Admin_QualificationComponent"
import {SpecializationClass} from "./admin/Admin_SpecializationComponent"
import {StateClass} from "./admin/Admin_StateComponent"
import { CategoryClass } from "./admin/Admin_CategoryComponent"
import { CityClass } from "./admin/Admin_CityComponent"
import { ExamClass } from "./admin/Admin_ExamComponent"
import { FeesClass } from "./admin/Admin_FeesComponent"
import { LeadClass } from "./admin/Admin_LeadComponent"
import { LocationClass } from "./admin/Admin_LocationComponent"
import { RoleClass } from "./admin/Admin_RoleComponent"
import { TechnologyClass } from "./admin/Admin_TechnologyComponent"
import {SuperUserAdminMainClass} from "./super_user/Super_UserAdminComponent"
import {SuperUserDashboardClass} from "./super_user/Super_userDashboardComponent"
import {SuperUserOwnersClass} from "./super_user/Super_OwnersComponent"
import {SuperUserEmployeeViewClass} from "./super_user/Super_EmployeeViewComponent"
import {SuperUserEmployeesClass} from "./super_user/Super_EmployeesComponent"
import {SuperUserBranchesClass} from "./super_user/Super_BranchesComponent"
import {CounsellerMainClass} from "./counseller/CounsellerComponent"
import {CounsellerDashboardClass} from "./counseller/CounsellerDashboardComponent"
import {EnquiryClass} from "./counseller/EnquiryComponent"
import {EnquiryFormClass} from "./counseller/EnquiryFormComponent"
import {LeadsClass} from "./counseller/LeadsComponent"
import {PlacementClass} from "./counseller/PlacementComponent"
import {WebsiteClass} from "./counseller/WebsiteComponent"
import { from } from "rxjs"
import { GenericApi } from "./APIS/GenericApi"
import {HttpClientModule} from "@angular/common/http"
import {ApiUrl} from "./APIS/GetApiUrl"


const myroutes:Routes=[
{path:'' , component:HomeClass},
{path:'login',component:LoginClass},
{path:"admin",component:AdminMainClass,children:[
{path:'',component:DashboardClass},
{path:'qualification',component:QualificationClass},
{path:'specialization',component:SpecializationClass},
{path:'state',component:StateClass},
{path:'category',component:CategoryClass},
{path:'city',component:CityClass},
{path:'exam',component:ExamClass},
{path:'fees',component:FeesClass},
{path:'lead',component:LeadClass},
{path:'location',component:LocationClass},
{path:'role',component:RoleClass},
{path:'technology',component:TechnologyClass},
]},
{path:'super_user',component:SuperUserAdminMainClass,children:[
    {path:'',component:SuperUserDashboardClass},
    {path:'owners',component:SuperUserOwnersClass},
    {path:'employee_view',component:SuperUserEmployeeViewClass},
    {path:'emp',component:SuperUserEmployeesClass},
    {path:'branches',component:SuperUserBranchesClass}
]},
{path:"counseller",component:CounsellerMainClass,children:[
    {path:'',component:CounsellerDashboardClass},
    {path:'leads',component:LeadsClass},
    {path:'placements',component:PlacementClass},
    {path:'enquiry',component:EnquiryClass},
    {path:'website_enquiry',component:WebsiteClass},
    {path:'enquiry_form',component:EnquiryFormClass}
]},


]
@NgModule({
imports:[BrowserModule,RouterModule.forRoot(myroutes),FormsModule,HttpClientModule,ReactiveFormsModule],
declarations:[MainClass,HomeClass,LoginClass,DashboardClass,QualificationClass,SpecializationClass,
StateClass,AdminMainClass,CategoryClass,CityClass,ExamClass,FeesClass,LeadClass,
LocationClass,RoleClass,TechnologyClass,SuperUserAdminMainClass,SuperUserDashboardClass,SuperUserOwnersClass,
SuperUserEmployeeViewClass,SuperUserEmployeesClass,SuperUserBranchesClass,CounsellerMainClass,CounsellerDashboardClass,
LeadsClass,PlacementClass,EnquiryClass,WebsiteClass,EnquiryFormClass],
bootstrap:[MainClass],
providers:[GenericApi,ApiUrl]
})
export class ModuleClass{

}