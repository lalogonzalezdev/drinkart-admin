import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  
  BASE_URL =  `${environment.apiUrl}`+'/acceso/';

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    register(email: string, password: string) {
      const BODY = {email, password};
      return this.http.post(this.BASE_URL+'usuarios/', BODY );
    }

    // login(email: string, password: string) {
    //   const BODY = {email, password};
    //   return this.http.post(`${environment.apiUrl}/users/authenticate`, BODY );
    // }


    login(email: string, password: string) {
      const BODY = {email, password};
      return this.http.post<any>(this.BASE_URL + 'login/', BODY)
          .pipe(map(user => {
              // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', user.token);
              localStorage.setItem('user', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}
