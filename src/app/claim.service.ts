import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import moment from 'moment/src/moment';
import * as moment from 'moment';



// var moment = require('moment/moment');

@Injectable()
export class ClaimService {

  constructor(private http: Http) { }

//   router.get('/claim/search/:id/:input', function(req, res, next) {
//   Claim.find({$and: [{insurer: req.params.id}, {motorNo: new RegExp(req.params.input, "i")}]}, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

  getAllMyClaims (id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      this.http.get('/api/user/claim/'+ id, {headers : headers})
        .map(res => res.json())
        .subscribe(res => {
          // res.claimDate.moment("MMMM dd YYYY");
          
          for (var i in res) {
            console.log("HUY" + res[i]);
            res[i].claimDate = moment(res[i].claimDate).format("L");
            res[i].year = moment(res[i].year).format("YYYY");
          }
          
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }

  getAllClaims() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      this.http.get('/api/claim', {headers : headers})
        .map(res => res.json())
        .subscribe(res => {
          // res.claimDate.moment("MMMM dd YYYY");
          console.log(res);
          for (var i in res) {
            res[i].claimDate = moment(res[i].claimDate).format("L");
            res[i].year = moment(res[i].year).format("YYYY");
          }
          
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showClaim(id) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        this.http.get('/api/claim/' + id, {headers : headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }


//   router.get('/claim/search/:id/:input', function(req, res, next) {
//   Claim.find({$or: [{lastName: new RegExp(req.params.input, "i")}, {orNo: new RegExp(req.params.input, "i")}]}, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });
  searchClaim(input){
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        this.http.get('/api/claim/search/'+ input, {headers: headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });

  }
  

  saveClaim(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        data.dateOfLoss = moment(data.dateOfLoss.formatted).format("MM-DD-YYYY");
        data.dateOfSettlement = moment(data.dateOfSettlement.formatted).format("MM-DD-YYYY");
        console.log(data);
        this.http.post('/api/claim', data, {headers : headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateClaim(id, data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        this.http.put('/api/claim/'+id, data, {headers : headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteClaim(id) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        this.http.delete('/api/claim/'+id, {headers :headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }


//   router.post('/csv', upload,function(req,res){
//     console.log("upload yay");
//     console.log(req.body) // req.body should be populated by request body
//     res.send('/dashboard');
// });
  uploadClaim(filecsv){
    console.log("uploading");
    return new Promise((resolve, reject) => {
        this.http.post('/api/csv', filecsv)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}