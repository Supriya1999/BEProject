import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {MainClass} from "./MainComponent"
import {HomeClass} from "./Homepage/HomeComponent"
import {LoginClass} from "./Login/LoginComponent"
import { Routes,RouterModule, Router } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { AdminMainClass } from "./admin/AdminComponent"
import {DashboardClass} from "./admin/Admin_DashboardComponent"
import {QualificationClass} from "./admin/Admin_QualificationComponent"
import {SpecializationClass} from "./admin/Admin_SpecializationComponent"
import {StateClass} from "./admin/Admin_StateComponent"
import { CategoryClass } from "./admin/Admin_CategoryComponent"
import { CityClass } from "./admin/Admin_CityComponent"
import { ExamssClass } from "./admin/Admin_ExamComponent"
import { FeesssClass } from "./admin/Admin_FeesComponent"
import { DemoClass } from "./admin/Admin_LeadComponent"
import { LocationClass } from "./admin/Admin_LocationComponent"
import { RoleClass } from "./admin/Admin_RoleComponent"
import { TechnologyClass } from "./admin/Admin_TechnologyComponent"
import {SuperUserAdminMainClass} from "./super_user/Super_UserAdminComponent"
import {SuperUserDashboardClass} from "./super_user/Super_userDashboardComponent"
import {SuperUserOwnersClass} from "./super_user/Super_OwnersComponent"
import {EmployeeClass} from "./super_user/EmployeeComponent"
import {SuperUserEmployeeViewClass} from "./super_user/Super_EmployeeViewComponent"
import {SuperUserEmployeesClass} from "./super_user/Super_EmployeesComponent"
import {SuperUserBranchesClass} from "./super_user/Super_BranchesComponent"


import {StudentMainClass} from "./Student/StudentComponent"
import { StudentDashboardClass } from "./student/StudentDashboardComponent"
import {CoursessClass} from "./student/CoursesComponent"
import {CoursesViewClass} from "./student/CoursesViewComponent"
import {ExamViewClass} from "./student/ExamViewComponent"
import {FeesClass} from "./student/FeesComponent"
import {FeesViewClass } from "./student/FeesViewComponent"
import {ForumClass} from "./student/ForumComponent"
import {PlacementsClass} from "./student/PlacementsComponents"
import { StudyClass} from "./student/StudyComponent"
import {ExamClass} from "./student/ExamComponent"
import {AccountantClass} from "./accountant/AccountantComponents"
import {AccountantDashboardClass} from "./accountant/AccountantDashboardComponent"
import {StudentClass} from "./accountant/StudentComponent"
import {StudentViewClass} from "./accountant/StudentViewComponent"
import {NewRegistrationClass} from "./accountant/NewRegisterationComponent"
import {InvoiceClass} from "./accountant/InvoiceComponent"
import {InvoiceViewClass} from "./accountant/InvoiceViewComponent"
import {ForumViewClass} from "./student/ForumViewComponent"

import {ApiUrl} from "./APIS/GetApiUrl"
import {CounsellerMainClass} from "./counseller/CounsellerComponent"
import {CounsellerDashboardClass} from "./counseller/CounsellerDashboardComponent"
import {LeadsClass} from "./counseller/LeadsComponent"
import {WebsiteClass} from "./counseller/WebsiteComponent"
import {PlacementClass} from "./counseller/PlacementComponent"
import {EnquiryClass} from "./counseller/EnquiryComponent"
import {EnquiryViewClass} from "./counseller/EnquiryViewComponent"
import {EnquiryFormClass} from "./counseller/EnquiryFormComponent"

import {DeveloperMainClass} from "./developer/DeveloperComponent"
import {DeveloperDashboardClass} from "./developer/DeveloperDashboardComponent"
import {CoursesClass} from "./developer/CoursesComponent"
import {YearOfStudyClass} from "./developer/YearOfStudyComponent"
import {SubjectsClass} from "./developer/SubjectsComponent"
import {UnitsClass} from "./developer/UnitsComponent"
import {ExamsClass} from "./developer/ExamsComponent"
import {ExammViewClass} from "./developer/ExamViewComponent"
import {CreateExamClass} from "./developer/CreateExamComponent"
import {StudyMaterialClass} from "./developer/StudyMaterialComponent"
import {DiscussionForumClass} from "./developer/DiscussionForumComponent"
import { CommonModule } from '@angular/common';

import {GenericApi} from "./APIS/GenericApi"
import { HttpClientModule } from "@angular/common/http"
import { from } from "rxjs"

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
    {path:'exam',component:ExamssClass},
    {path:'fees',component:FeesssClass},
    {path:'lead',component:DemoClass},
    {path:'location',component:LocationClass},
    {path:'role',component:RoleClass},
    {path:'technology',component:TechnologyClass},
    ]},

    {path:'super_user',component:SuperUserAdminMainClass,children:[
        {path:'',component:SuperUserDashboardClass},
        {path:'owners',component:SuperUserOwnersClass},
        {path:'employee',component:EmployeeClass},
        {path:'employee_view/:id',component:SuperUserEmployeeViewClass},
        {path:'employee_registeration',component:SuperUserEmployeesClass},
        {path:'branches',component:SuperUserBranchesClass}
    ]},
    
   
   {path:'student',component:StudentMainClass,children:[
    {path:'',component:StudentDashboardClass}, 
    {path:'courses',component:CoursessClass},
    {path:'courses_view',component:CoursesViewClass},
    {path:'exams_view',component:ExamViewClass},
    {path:'exams',component:ExamClass},
    {path:'fees',component:FeesClass},
    {path:'fees_view',component:FeesViewClass},
    {path:'forum',component:ForumClass},
    {path:'placements',component:PlacementsClass},
    {path:'study',component:StudyClass},
    {path:'forum_view',component:ForumViewClass}
]},

{path:'accountant',component:AccountantClass,children:[
    {path:'',component:AccountantDashboardClass},
    {path:'student',component:StudentClass},
    {path:'new_registration',component:NewRegistrationClass},
    {path:'student_view/:id',component:StudentViewClass},
    {path:'invoice',component:InvoiceClass},
    {path:'invoice_view/:id',component:InvoiceViewClass}
]},
   {path:"counseller",component:CounsellerMainClass,children:[
        {path:'',component:CounsellerDashboardClass},
        {path:'leads',component:LeadsClass},
        {path:'placements',component:PlacementClass},
        {path:'enquiry',component:EnquiryClass},
        {path:'enquiry_view/:id',component:EnquiryViewClass},
        {path:'website_enquiry',component:WebsiteClass},
        {path:'enquiry_form',component:EnquiryFormClass}
    ]},
    {path:'developer',component:DeveloperMainClass,children:[
        {path:'',component:DeveloperDashboardClass},
        {path:'courses',component:CoursesClass},
        {path:'year_of_study',component:YearOfStudyClass},
        {path:'subjects',component:SubjectsClass},
        {path:'units',component:UnitsClass},
        {path:'exams',component:ExamsClass},
        {path:'exam_view/:id',component:ExammViewClass},
        {path:'create_exam',component:CreateExamClass},
        {path:'study_material',component:StudyMaterialClass},
        {path:'discussion_forum',component:DiscussionForumClass},
        

    ]},



    ]
    @NgModule({
        imports:[BrowserModule,CommonModule,RouterModule.forRoot(myroutes),FormsModule,HttpClientModule,ReactiveFormsModule],
        declarations:[MainClass,HomeClass,LoginClass,CounsellerMainClass,CounsellerDashboardClass,
            LeadsClass,PlacementClass,WebsiteClass,EnquiryClass,EnquiryViewClass,EnquiryFormClass,DeveloperMainClass,
            DeveloperDashboardClass,CoursesClass,YearOfStudyClass,SubjectsClass,UnitsClass,ExamsClass,ExammViewClass,
            CreateExamClass,StudyMaterialClass,DiscussionForumClass,StudentMainClass,StudentDashboardClass,CoursesViewClass,
            CoursesClass,ExamViewClass,ExamClass,FeesViewClass,FeesClass,ForumClass,PlacementsClass,StudyClass,ForumViewClass,
            AccountantClass,AccountantDashboardClass,StudentClass,NewRegistrationClass,InvoiceViewClass,InvoiceClass,AdminMainClass
            ,CategoryClass,CityClass,DashboardClass,ExamssClass,FeesssClass,LeadsClass,LocationClass,QualificationClass,SpecializationClass,RoleClass,StateClass,TechnologyClass
            ,LeadsClass,StudentViewClass,DemoClass,SuperUserAdminMainClass,SuperUserDashboardClass,SuperUserOwnersClass,EmployeeClass,SuperUserEmployeeViewClass,SuperUserEmployeesClass,SuperUserBranchesClass
        ],
        bootstrap:[MainClass],
        providers:[GenericApi,ApiUrl]
    })
    export class ModuleClass{
        
    }
