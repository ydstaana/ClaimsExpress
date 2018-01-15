import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UploadService {

  constructor(private http: Http) { }

  uploadClaim(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/api/claim/upload', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
