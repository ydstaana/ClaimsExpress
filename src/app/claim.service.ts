import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ClaimService {

  constructor(private http: Http) { }

  getAllClaims() {
    return new Promise((resolve, reject) => {
      this.http.get('/claim')
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showClaim(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/claim/' + id)
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
        this.http.post('/claim', data)
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
        this.http.put('/claim/'+id, data)
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
        this.http.delete('/claim/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}