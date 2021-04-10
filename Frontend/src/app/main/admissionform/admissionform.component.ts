import { Application } from './../../admin/admin-services/user.model';
import { PdfgenrateService } from './../../user/user-services/pdfgenrate.service';

import { FormsModule, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {MatTabsModule} from '@angular/material/tabs';
import * as _ from 'lodash';
import { isTemplateExpression } from 'typescript';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { style } from '@angular/animations';
import { SelectService } from 'src/app/user/user-services/select.service';
import { ApplicationForm, Education, Education1 } from 'src/app/admin/admin-services/resume';
import { District, State } from 'src/app/user/user-services/selectdata';
import { UserService } from 'src/app/user/user-services/user.service';
import { ApplicationService } from 'src/app/user/user-services/application.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'admissionform',
  templateUrl: './admissionform.component.html',
  styleUrls: ['./admissionform.component.css'],
  providers:[SelectService],
  encapsulation: ViewEncapsulation.None
})
export class AdmissionformComponent implements OnInit {
  public studentForm:FormGroup;
  public student = new ApplicationForm();
  minDate: Date;
  maxDate: Date;
  userDetails;
  token;
  selectedIndex: number;
  imageError: any;
  cardImageBase64: any;
  isImageSaved: boolean;
  imageError1: any;
  cardImage1Base64: any;
  isImage1Saved: boolean;
  signError:any;
  cardSignBase64:any;
  isSignSaved:boolean;
  districts: District[];
  states: State[];
  isChecked: boolean;

  
  onSelect(stateid) {this.districts = this.selectService.getDistricts().filter((item) => item.stateid == stateid);}
  onSelect1(stateid) {this.districts = this.selectService.getDistricts().filter((item) => item.stateid == stateid);}


  constructor(private formbuilder: FormBuilder,
    private application:ApplicationService,private route: ActivatedRoute,private selectService: SelectService,private userService:UserService,private PdfgenrateService:PdfgenrateService) 
  {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const day = new Date().getDate();
      this.minDate = new Date(currentYear - 120, currentMonth - 0, day - 1  );
      this.maxDate = new Date(currentYear - 15, currentMonth -0, day - 1  );
  
      this.student = JSON.parse(sessionStorage.getItem('student')) || new ApplicationForm(); 
      if (!this.student.educations || this.student.educations.length === 0) {
        this.student.educations = [];
        this.student.educations.push(new Education());
      }  

      if (!this.student.educations1 || this.student.educations1.length === 0) {
        this.student.educations1 = [];
        this.student.educations1.push(new Education1());
      }  
      
        

this.isChecked = false;
this.studentForm = this.formbuilder.group({
room: [''],room1: [''],
country:[''],country1:[''],
state:[''],state1:[''],
district:[''],district1:[''],
city:[''],city1:[''],
pincode:[''],pincode1:[''],
});}

ngOnInit() {
  this.userService.getUserProfile().subscribe(
    res => {
      this.userDetails = res['data'];
    },
    err => {
      console.log(err);
    }
  );
this.selectedIndex=0;
this.states = this.selectService.getStates();
this.studentForm = new FormGroup({
course : new FormControl('',[Validators.required,]),
category : new FormControl('',[Validators.required,]),
inhouse:new FormControl('',[Validators.required]),
seatno:new FormControl('',[]),
fullname: new FormControl('',[Validators.required,Validators.minLength(3)]),
mothername: new FormControl('',[Validators.required,Validators.minLength(3)]),
dob :new FormControl('',[Validators.required,Validators.min(0)]),
firstname : new FormControl('', [Validators.required,Validators.minLength(3)]),
middlename:new FormControl('',[Validators.required]),
lastname:new FormControl('',[]),
gender : new FormControl('',[Validators.required]),
mstatus : new FormControl('',[Validators.required]),
pob : new FormControl('',[Validators.required]),
subcaste:new FormControl('',[]),
nationality : new FormControl('',[Validators.required]),
religion : new FormControl('',[Validators.required]),
telephone:new FormControl('',[]),
game:new FormControl('',[]),
other:new FormControl('',[]),
extrac:new FormControl('',[]),
ad:new FormControl('',[]),
mothertongue:new FormControl('',Validators.required),
bloodgroup: new FormControl('',[Validators.required]),
aadhar : new FormControl('',[Validators.required,Validators.minLength(12),Validators.maxLength(12)]),
mobileno: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
email : new FormControl('', [Validators.required, Validators.email]),
fname: new FormControl('',Validators.required),
fqualification:new FormControl('',[]),
foccupation: new FormControl('',[Validators.required]),
fincome: new FormControl('',[Validators.required]),
fmobile: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
fdesignation:new FormControl('',[]),
fnameoforg:new FormControl('',[]),
foffice:new FormControl('',[]),
motherfullname: new FormControl('',[Validators.required,Validators.minLength(3)]),
mqualification:new FormControl('',[]),
moccupation:new FormControl('',[]),
mother_mobileno:new FormControl('',[]),
mdesignation:new FormControl('',[]),
mnameoforg:new FormControl('',[]),
moffice:new FormControl('',[]),
guardian_name:new FormControl('',[]),
guardian_qualification:new FormControl('',[]),
guardian_occupation:new FormControl('',[]),
gdesignation:new FormControl('',[]),
gnameoforg:new FormControl('',[]),
goffice:new FormControl('',[]),
guardian_mobileno:new FormControl('',[]),
ssc: new FormControl('',[Validators.required]),
board: new FormControl('',[Validators.required]),
sc: new FormControl('',[Validators.required]),
py: new FormControl('',[Validators.required]),
mo: new FormControl('',[Validators.required]),
moo: new FormControl('',[Validators.required]),
percentage: new FormControl('',[Validators.required]),
seatn: new FormControl('',[Validators.required]),
hsc: new FormControl('',[Validators.required]),
board1: new FormControl('',[Validators.required]),
sc1: new FormControl('',[Validators.required]),
py1: new FormControl('',[Validators.required]),
seatn1: new FormControl('',[Validators.required]),
mo1: new FormControl('',[Validators.required]),
moo1: new FormControl('',[Validators.required]),
percentage1: new FormControl('',[Validators.required]),
sem1 : new FormControl('',[Validators.required,]),
board2: new FormControl('',[Validators.required,]),
sc2: new FormControl('',[Validators.required,]),
mp2: new FormControl('',[Validators.required]),
percentage2: new FormControl('',[Validators.required]),
grade : new FormControl('',[Validators.required]),
sem2 : new FormControl('',[Validators.required,]),
board3: new FormControl('',[Validators.required,]),
sc3: new FormControl('',[Validators.required,]),
mp3: new FormControl('',[Validators.required]),
percentage3: new FormControl('',[Validators.required]),
grade1 : new FormControl('',[Validators.required]),
room: new FormControl('',[Validators.required]),
country: new FormControl('',[Validators.required]),
state: new FormControl('',[Validators.required]),
district: new FormControl('',[Validators.required]),
city: new FormControl('',[Validators.required]),
pincode: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
room1: new FormControl('',[Validators.required]),
country1: new FormControl('',[Validators.required]),
state1: new FormControl('',[Validators.required]),
district1: new FormControl('',[Validators.required]),
city1: new FormControl('',[Validators.required]),
pincode1 : new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
aadhar1: new FormControl('',[Validators.required]),
rationcard: new FormControl('',[Validators.required]),
firstterm: new FormControl('',[Validators.required]),
secondterm: new FormControl('',[Validators.required]),
photo: new FormControl('',[Validators.required]),
sign: new FormControl('',[Validators.required]),
check: new FormControl('',[Validators.required]),});   
  
 }

public hasError = (controlName: string, errorName: string) =>{
    return this.studentForm.controls[controlName].hasError(errorName);}

upload(){
  this.application.uploaddocs(this.studentForm.value).subscribe(
    res =>{
      window.alert('Form Submitted Successfully')
      console.log(res);
    }
  )
}
onSubmitApplication() {
  this.application.postApplicationform(this.studentForm.value).subscribe(
    res => {
      window.alert('Form Submitted Successfully')
      console.log(res);
    });
  }

  checkValue(e) { {
    if (e.target.checked) {
      const dVal = this.studentForm.controls["room"].value;
      const cVal= this.studentForm.controls["country"].value;
      const sVal= this.studentForm.controls["state"].value;
      const diVal= this.studentForm.controls["district"].value;
      const ciVal= this.studentForm.controls["city"].value;
      const pVal= this.studentForm.controls["pincode"].value;
      this.studentForm.controls["room1"].setValue(dVal);
      this.studentForm.controls["country1"].setValue(cVal);
      this.studentForm.controls["state1"].setValue(sVal);
      this.studentForm.controls["district1"].setValue(diVal);
      this.studentForm.controls["city1"].setValue(ciVal);
      this.studentForm.controls["pincode1"].setValue(pVal);

    }
    else {
      this.studentForm.controls["room1"].setValue('');
      this.studentForm.controls["country1"].setValue('');
      this.studentForm.controls["state1"].setValue('');
      this.studentForm.controls["district1"].setValue('');
      this.studentForm.controls["city1"].setValue('');
      this.studentForm.controls["pincode1"].setValue('');
   `` }}} 
   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  letterOnly(event) : Boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
  // tab change index
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
}
public nextStep() {
    this.selectedIndex += 1;
}
public prevStep() {
    this.selectedIndex -= 1;}


fileChangeEvent2(fileInput: any) {
this.imageError = null;
if (fileInput.target.files && fileInput.target.files[0]) {
// Size Filter Bytes
const max_size = 1000000;
const allowed_types =  ['application/pdf', 'image/jpg','image/jpeg'];


if (fileInput.target.files[0].size > max_size) {
this.imageError ='* Upto 1000kb';
return false;}

if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
this.imageError = '* The file format should ( JPG | JPEG | PDF )';
return false;}
}
}
/////////////////for image1
fileChangeEvent(fileInput: any) {
this.imageError1 = null;
if (fileInput.target.files && fileInput.target.files[0]) {
 // Size Filter Bytes
const max_size = 300000;
const allowed_types = ['image/jpg', 'image/jpeg'];

if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
this.imageError1 = '* Photograph Format should be JPEG';
return false;}

const reader = new FileReader();
reader.onload = (e: any) => {
const image = new Image();
image.src = e.target.result;
this.student.profilepic = reader.result as string;
image.onload = rs => {

if ( fileInput.target.files[0].size > max_size) {
  this.imageError1 = ' upto 300kb';
  return false;}
else {
const imgBase64Path = e.target.result;
 this.cardImage1Base64 = imgBase64Path;
this.isImage1Saved = true;
}
};
};
reader.readAsDataURL(fileInput.target.files[0]);
}
}

 /////////////////for sign
fileChangeEvent1(fileInput1: any) {
this.signError = null;
if (fileInput1.target.files && fileInput1.target.files[0]) {
// Size Filter Bytes
const max_size = 300000;
const allowed_types = ['image/jpg', 'image/jpeg'];
if (!_.includes(allowed_types, fileInput1.target.files[0].type)) {
this.signError = '* Photograph Format should be JPEG';
return false;}
const reader1 = new FileReader();
reader1.onload = (e: any) => {
const image1 = new Image();
image1.src = e.target.result;
this.student.sign = reader1.result as string;
image1.onload = rs => {


if ( fileInput1.target.files[0].size > max_size) {
  this.signError = 'The size of the photograph should fall between 5KB to 20KB';
  return false;}
else {
const signBase64Path = e.target.result;
this.cardSignBase64 = signBase64Path;
this.isSignSaved = true;}
};};
reader1.readAsDataURL(fileInput1.target.files[0]);}}

removeImage() {this.cardImage1Base64 = " ";this.isImage1Saved = false;}
removeSign(){this.cardSignBase64 = null;this.isSignSaved = false;}



isMobileDashboard() {
  if (innerWidth > 960 || (innerWidth > 600 && innerWidth < 639)) {
    return false;
  }
  return true;
}

  generatePdf(action = 'open') {
   const documentDefinition =   this.getDocumentDefinition();
     switch (action) {
     case 'open': pdfMake.createPdf(documentDefinition).open(); break;
     case 'print': pdfMake.createPdf(documentDefinition).print(); break;
     case 'download': pdfMake.createPdf(documentDefinition).download(); break;
     default: pdfMake.createPdf(documentDefinition).open(); break;
     
     }
    //  this.resetForm();
 }
 getDocumentDefinition() {
  sessionStorage.setItem('student', JSON.stringify(this.student));
  return {
    content:[
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['*', 'auto', 'auto'],
         
          
          body: [
          
            [ {colSpan: 2, rowSpan: 2, text: ''},'Sample value 1',this.getProfilePicObject() ],
            ['Sample value 1', 'wrr', this.getSignObject()],
          ]
        }
      },
     
      {
              text: 'Admission Form 2021-2022',
              fontSize: 18,
              alignment: 'center',
              margin: [0, 5, 0, 5],
              color:'darkblue',
    },
    
  
    {
      style: 'tableExample',
      table: {
        heights: 12,
        widths: ['*', '*','*','*'],
        alignment:'justify',
        body: [
          ['Applied Course', 'Applying Category' ,'Inhouse Student','Seat No'],
          [this.student.course, this.student.category,this.student.inhouse,this.student.seatno],
          ]
      }
    },
    // this.formGroup.get('name of you control').value
{
text:'Personal Information',
style:'header'
}, 
 {style:'names',
 columns:[
   {
    text:'Name as per SSC/HSC Marksheet :'
    },
  {
  text: this.student.fullname,style:'xyz'
},
 ]
},

                
{
style:'names',
alignment:'justify', 
columns:[

    [
      'First Name:',{ text:this.student.firstname,style:'xyz'}
    ],
  
    [
      'Middle Name:',{text:this.student.middlename,style:'xyz'}
    ],
    [
      'Last Name:',{text:this.student.lastname,style:'xyz'}
    ],
    [
      'Mother Name:',{text:this.student.mothername,style:'xyz'}
    ],
  
      
]

},
    {style:'names',
 alignment:'justify',
columns:[
[
    'Date of Birth:',{ text:this.student.dob,style:'xyz'}
],
[
    'Gender:',{text:this.student.gender,style:'xyz'}
],
[
  'Nationality:',{text:this.student.nationality,style:'xyz'}
],
[
  'Marital Status:',{text:this.student.mstatus,style:'xyz'}
],
   
]
},

{style:'names',
alignment:'justify',
columns:[
[
'Religion:',{text:this.student.religion,style:'xyz'}
],
[
'Sub-Caste:',{text:this.student.subcaste,style:'xyz'}
],
[
'Mother Tongue:',{text:this.student.mothertongue,style:'xyz'}
],
[
'Blood Group:', {text :this.student.bloodgroup,style:'xyz'}
],


]
},


{style:'names',
alignment:'justify',
columns:[
[
'Aadhar Number:', {text:this.student.aadhar,style:'xyz'},
],
[
'Mobile Number',{ text:this.student.mobileno,style:'xyz'}
],
[
'Place of Birth:',{   text:this.student.pob,style:'xyz'}
],
[
'Domicile(state):', {text :this.student.dom,style:'xyz'}
],


]
},



  
{style:'names',
alignment:'justify',
columns:[
[
'Email:',{text:this.student.email,style:'xyz'},
]
       
]
},

{
text: 'Address Details',
style: 'header'
},
{
style:'address',
alignment:'justify',
columns:[

  [
    'Permanent Address',{text:this.student.room,style:'address2'},
  ],
  [
    'Correspondance Address',{text:this.student.room1,style:'address2'},
  ],
  
]
},
{style:'names',
alignment:'justify',
columnGap:
5,
columns:[
[
'State:', {text:this.student.state,style:'xyz'},
],
[
'District',{ text:this.student.district,style:'xyz'}
],
[
'City/Town:',{   text:this.student.city,style:'xyz'}
],
[
'Pin Code:', {text :this.student.pincode,style:'xyz'}
],
[
'State:', {text:this.student.state1,style:'xyz'},
],
[
'District',{ text:this.student.district1,style:'xyz'}
],
[
'City/Town:',{   text:this.student.city1,style:'xyz'}
],
[
'Pin Code:', {text :this.student.pincode1,style:'xyz'}
],


]
},

{
text: 'Academic Information',
style: 'header'
},
{
text: 'Secondary and Higher Secondary',
style: 'subheader'
},
this.getEducationObject(this.student.educations),
{
text: 'Graduation',
style: 'subheader'
}, 
this.getEducation1Object(this.student.educations1),  
{
text: 'Extra Curriculars',
style: 'header'
},

{style:'names',
alignment:'justify',
columns:[
[
'Sports:',{ text:this.student.game,style:'xyz'}
],
[
'Extracurricular Activity:',{text:this.student.extrac,style:'xyz'}
],
[
'Any Disability:',{text:this.student.ad,style:'xyz'}
],
[
'Other Activity:',{text:this.student.other,style:'xyz'}
]

]
},
{
text: 'Parents Information',
style: 'header'
},
{
style: 'tableExample',
table: {
heights: 12,
widths: ['*', '*','*','*'],
alignment:'justify',
body: [
['', 'Father' ,'Mother','Guardian'],
['Name', this.student.fname,this.student.motherfullname,this.student.guardian_name],
['Qualification', this.student.fqualification,this.student.mqualification,this.student.guardian_qualification],
['Occupation', this.student.foccupation,this.student.moccupation,this.student.guardian_occupation],
['Name of Organisation', this.student.fnameoforg,this.student.mnameoforg,this.student.gnameoforg],
['Designation', this.student.fdesignation,this.student.mdesignation,this.student.gdesignation],
['Office Address', this.student.foffice,this.student.moffice,this.student.goffice],
['Family Annual Income', this.student.fincome,'-','-'],
['Mobile No',this.student.fmobile,this.student.mother_mobileno,this.student.guardian_mobileno ],

]
}
},
{
  text:'Declaration by Student and Parent/Guardian',
  style:'header'
},
{
  text:'We here by declare that,we have read the rules and eligibility criteria related to admission and the information  '+' filled in this form in accurate and true to be the best of our knowledge. We will be responsible for any discrepacy,arising, out of the wrong information furnished and signed by us and we undertake that,in the absence of any document the final admission will not be granted and /or admission will stand cancelled,under such circumstances we will have no claim against the college.',
  style:'declare'
},
//   {
//     canvas: [
//         { type: 'line', x1: 390, y1: -80, x2: 510, y2: -80, lineWidth: 1 }, //Up line
//         { type: 'line', x1: 390, y1: -35, x2: 510, y2: -35, lineWidth: 1 }, //Bottom line
//         { type: 'line', x1: 390, y1: -80, x2: 390, y2: -35, lineWidth: 1 }, //Left line
//         { type: 'line', x1: 510, y1: -80, x2: 510, y2: -35, lineWidth: 1 }, //Rigth line
//     ]
// },
{
  style: 'tableExample',
  table: {
    alignment: 'center',
    widths: ['*', '*','*','*'],
    heights: 55,
    body: [
      ['Date','Place','Signature of parents/guardian','Signature of Student' ],
  
    ]
  }
},
{
  text:'FOR OFFICE USE ONLY',
  style:'header1'
},
{
  style: 'tableExample',
  table: {
    alignment: 'center',
    widths: ['*', '*','*'],
    heights: 55,
    body: [
      ['Checked by Signature','Signature of Prof. Incharge/Principal','Signature of Cashier' ],
  
    ]
  }
},

  ],
info:{
title:'Admission Form',
author: 'ExpertFees',
subject: 'Admission Form',
},
styles:{
header:{
fontSize: 14,
bold: true,
margin: [0, 10, 0, 0],
decoration: 'underline',
color:'darkblue'},
header1:{
  fontSize: 14,
  bold: true,
  margin: [0, 20, 0, 10],
  decoration: 'underline',
  alignment: 'center',
  },
declare:{
fontSize:10,
margin: [0, 0, 0, 25],
},

tableHeader:{
bold:true,
fillColor: 'ghostwhite',
alignment:'justify',
fontSize:10,
},

personal:{
bold:true,
fontSize:10,
margin:[0,10,0,0],
font:'Roboto',
fillColor:'blue',
},

address:{
  bold:true,
  fontSize:11,
  alignment:'justify',
  margin:[0,10,0,0],
  columnGap: 20,
  decoration:'underline',
  font:'Roboto'},

tableExample:{
fontSize:11},

address2:{
bold:false,
fontSize:11,
alignment:'justify',
margin:[0,10,0,0,],
decoration:false,
font:'Roboto'},

names:{
bold:true,
fontSize:11,
margin:[0,10,0,0],
font:'Roboto'},

xyz:{
bold:false,
fontSize:11,
font:'Roboto',
fillColor:'blue',
margin:[0,2,0,5],
},

xy:{
  margin:[0,10,0,0],
  bold:false,
  fontSize:10},

course:{
bold:true,
fontSize:10,
margin:[0,10,,5,0],
font:'Roboto',},

subheader:{
bold:true,
fontSize:12,
margin:[0,5,0,5],
decoration:'underline'},

sign:{
  fontSize:9},
extracurricular:{
bold:true,
fontSize:11,
margin:[0,10,,5,15],
font:'Roboto'
},

  }
}



}

getEducationObject(educations: Education[]) {
return {
table: {

widths: ['auto', 'auto', 'auto', 'auto','auto','auto','auto','auto'],
body: [
[{
text: 'Exam Name',
style: 'tableHeader'
},
{
text: 'Board/University',
style: 'tableHeader'
},
{
text: 'School/College',
style: 'tableHeader'
},
{
text: 'Seat/Roll No',
style: 'tableHeader'
},
{
text: 'Month of Passing',
style: 'tableHeader'
},
{
text: 'Marks Obtained',
style: 'tableHeader'
},
{
text: 'Marks out Of',
style: 'tableHeader'
},
{
text: 'Percentage',
style: 'tableHeader'
},
],
...educations.map(ed => {
return [ed.ssc, ed.board, ed.sc, ed.py, ed.mo, ed.moo, ed.percentage, ed.seatn];
}),
...educations.map(ed => {
return [ed.hsc, ed.board1, ed.sc1, ed.py1, ed.mo1, ed.moo1, ed.percentage1, ed.seatn1];
})
]
}
};
}

getEducation1Object(educations1: Education1[]) {
return {
table: {

widths: ['*', '*', '*', '*','*','*'],
body: [
[{
text: 'Semester',
style: 'tableHeader'
},
{
text: 'Board/University',
style: 'tableHeader'
},
{
text: 'School/College',
style: 'tableHeader'
},
{
text: 'Month of Passing',
style: 'tableHeader'
},
{
text: 'Percentage/SGPA',
style: 'tableHeader'
},  
{
text: 'Grade',
style: 'tableHeader'
},

],
...educations1.map(ed1 => {
return [ed1.sem1, ed1.board2, ed1.sc2, ed1.mp2,ed1.percentage2,ed1.grade];
}),
...educations1.map(ed1 => {
return [ed1.sem2, ed1.board3, ed1.sc3, ed1.mp3,ed1.percentage3,ed1.grade1];
}),
]
}
};
}
getProfilePicObject() {
if (this.student.profilepic) {
return {
image: this.student.profilepic ,
width: 75,
height:70,
alignment:'justify',
margin: [5, 5, 5, 5],
};
}
return null;
}
getSignObject() {
if (this.student.sign) {
return {
image: this.student.sign ,
width: 80,
height:25,
alignment:'justify',
margin: [5, 5, 5, 5],

};
}
return null;
}
          

resetForm() {
 this.student = new ApplicationForm();
}



}