import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

const BACKEND_URL = environment.apiUrl + '/userController/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token :any;
  // private tokenTime;
  private username: any;
  private authStatusListener = new Subject<boolean>();
  // private errormessage: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  private saveAuthData(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
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

  login(username: string, password: string) {
    // const authData: User = {username, password};
    // console.log(username, password, 'Basic ' + btoa(username + ':' + password), btoa(username + ':' + password));
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    this.http.get<{ token: string, username: string }>(BACKEND_URL + 'login', {headers}).subscribe(
      response => {
        const token = response.token;
        this.token = token;
        this.username = response.username;
        // console.log(token);
        if (token) {
          this.isAuthenticated = true;
          console.log('getAuthenticated');
          this.authStatusListener.next(true);
          this.saveAuthData(token, username);
          this.router.navigate(['/search']);
        }
      },
      () => {
        this.authStatusListener.next(false);
        // console.log('failed login');
        // alert('Wrong username or password');
      }
    );
  }

  createUser(username: string, password: string) {
    const authData: User = {username, password};
    this.http.post(BACKEND_URL + 'register', authData).subscribe(
      () => {
        this.router.navigate(['/search']);
        console.log('success');
      },
      () => {
        this.authStatusListener.next(false);
        console.log('error');
      }
    );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.username = null;
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  autoAuthUser() {
    const authInfo = this.getAutoData();
    if (!authInfo) {
      return;
    }
    this.isAuthenticated = true;
    this.token = authInfo.token;
    this.username = this.username;
    this.authStatusListener.next(true);
  }

  getAutoData() {
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

}
