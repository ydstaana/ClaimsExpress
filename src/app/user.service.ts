import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  verifyUser(user) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/login/'+ user.username + "/" + user.password)
        .map(res => res.json())
        .subscribe(res => {
          localStorage.setItem('token', res.token);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  //  getAllClaims() {
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers();
  //     headers.append('Content-Type', 'application/json');
  //     let authToken = localStorage.getItem('token');
  //     headers.append('Authorization', authToken);
  //     this.http.get('/api/claim', {headers : headers})
  //       .map(res => res.json())
  //       .subscribe(res => {
  //         // res.claimDate.moment("MMMM dd YYYY");
  //         console.log(res);
  //         for (var i in res) {
  //           res[i].claimDate = moment(res[i].claimDate).format("L");
  //           res[i].year = moment(res[i].year).format("YYYY");
  //         }
          
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }


  getAllUsers() {
    
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      this.http.get('/api/user', {headers : headers})
        .map(res => res.json())
        .subscribe(res => {
          console.log("EY EYEY" + res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showUser(id) {
    return new Promise((resolve, reject) => {
        this.http.get('/api/user/' + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveUser(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/api/user', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateUser(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put('/api/user/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/api/user/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  getMyLogs() {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('token');
        headers.append('Authorization', authToken);
        this.http.get('/api/user-logs', {headers : headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

 getAllLogs() {
  return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      this.http.get('/api/org-logs', {headers : headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
  });
}

getAllOrgs() {
  return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('token');
      headers.append('Authorization', authToken);
      this.http.get('/api/organization', {headers : headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
  });
}

}