import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UploadService {

  

  constructor(private http: Http) { }

  getToken(){
      return localStorage.getItem('token');
  }

}


// var options = {
//     map: function(value, index) {
//         switch(index) {
//             case 0:
//                 // column 1 is string
//                 return value;
//             case 1:
//                 // column 2 is a date
//                 return new Date(value);
//             case 2:
//                 // column 3 is JSON of a formula value
//                 return JSON.parse(value);
//             default:
//                 // the rest are numbers
//                 return parseFloat(value);
//         }
//     }
// };
// workbook.csv.readFile(filename, options)
//     .then(function(worksheet) {
//         // use workbook or worksheet
//     });

// }
