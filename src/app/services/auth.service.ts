import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {tokenName} from "@angular/compiler";

const BACKEND_URL = environment.apiUrl + '/userController/';
//ng serve --proxy-config=proxy.conf.json

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token :string;
  private tokenTimer: any;
  private username: any;
  private authStatusListener = new Subject<boolean>();
  private errormessage: string;
  private userId: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }


  getToken() {
    return this.token;
  }


  getIsAuthenticated() {
    return this.isAuthenticated;
  }


  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  // login(username: string, password: string) {
  //   // const authData: User = {username, password};
  //   // console.log(username, password, 'Basic ' + btoa(username + ':' + password), btoa(username + ':' + password));
  //   const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
  //   this.http.post<{ token: string, username: string }>(BACKEND_URL + 'authenticate', {headers}).subscribe(
  //     response => {
  //       const token = response.token;
  //       this.token = token;
  //       this.username = response.username;
  //       // console.log(token);
  //       if (token) {
  //         this.isAuthenticated = true;
  //         console.log('getAuthenticated');
  //         this.authStatusListener.next(true);
  //         this.saveAuthData(token, username);
  //         this.router.navigate(['/search']);
  //       }
  //     },
  //     () => {
  //       this.authStatusListener.next(false);
  //       // console.log('failed login');
  //       // alert('Wrong username or password');
  //     }
  //   );
  // }

  login(username: string, password: string) {
    // debugger;
    const authData: User = {username, password};
    this.http
      .post<{token: string; expiresIn: number; userId: string}>(
      BACKEND_URL + "authenticate", authData
    )
      .subscribe(
        response =>{
          // localStorage.setItem('token', response.token);
          // const expiresInDuration = response.expiresIn;
          // this.setAuthTimer(expiresInDuration);
          // this.isAuthenticated = true;
          // this.authStatusListener.next(true);
          // const now = new Date();
          // const expirationDate = new Date(
          //   now.getTime() + expiresInDuration * 1000
          // );
          // localStorage.setItem("expiration", expirationDate.toISOString());
          // localStorage.setItem("userId", response.userId);
          // this.router.navigate(["/search"]);

          const token = response.token;
          this.token = token;
          if(token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(["/search"]);
            console.log('success');
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      )
  }

  createUser(username: string, password: string) {
    const authData: User = {username, password};
    this.http.post(BACKEND_URL + 'createUser', authData).subscribe(
      () => {
        this.router.navigate(['/login']);
        console.log('success');
      },
      () => {
        this.authStatusListener.next(false);
        console.log('error');
      }
    );
  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.username = null;
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private autoAuthUser() {
    const authInfo = this.getAutoData();
    if (!authInfo) {
      return;
    }
    this.isAuthenticated = true;
    this.token = authInfo.token;
    this.username = this.username;
    this.authStatusListener.next(true);
  }

  private getAutoData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('username');
    if (!token) {
      return;
    }
    return {
      token,
      userId
    };
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

}
