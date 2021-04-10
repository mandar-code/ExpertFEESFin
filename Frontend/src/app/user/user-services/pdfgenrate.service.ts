
import { Injectable, Input, Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApplicationForm, Education, Education1 } from 'src/app/admin/admin-services/resume';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PdfgenrateService {

  @Input()  public student = new ApplicationForm();

 

  constructor() {
    
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
        // {
        //   style: 'tableExample',
        //   table: {
        //     alignment: 'center',
        //     widths: ['*', '*'],
        //     heights: 130,
        //     body: [
        //       ['',this.getProfilePicObject() ],
          
        //     ]
        //   }
        // },
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
  return [ed.ssc, ed.board, ed.sc, ed.py,ed.mo,ed.moo,ed.percentage,ed.seatn];
}),
...educations.map(ed => {
  return [ed.hsc, ed.board1, ed.sc1, ed.py1,ed.mo1,ed.moo1,ed.percentage1,ed.seatn1];
})
]
}
};
}

getEducation1Object(educations1: Education1[]) {
return {
table: {

widths: ['auto', 'auto', 'auto', 'auto','auto','auto'],
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
  }