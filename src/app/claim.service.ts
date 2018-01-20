import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import moment from 'moment/src/moment';
import * as moment from 'moment';



// var moment = require('moment/moment');

@Injectable()
export class ClaimService {

  constructor(private http: Http) { }

  getAllClaims() {
    return new Promise((resolve, reject) => {
      this.http.get('/api/claim')
        .map(res => res.json())
        .subscribe(res => {
          // res.claimDate.moment("MMMM dd YYYY");
          console.log(res);
          for (var i in res) {
            res[i].claimDate = moment(res[i].claimDate).format("MM/DD/YYYY");
          }
          
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showClaim(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/api/claim/' + id)
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
        this.http.get('/api/claim/search/'+ input)
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
        this.http.post('/api/claim', data)
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
        this.http.put('/api/claim/'+id, data)
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
        this.http.delete('/api/claim/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  uploadClaim(filecsv){
    console.log("uploading");
    return new Promise((resolve, reject) => {
        this.http.post('/api/claim', filecsv)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}