import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isLoginPage: boolean;
  isAuthenticate = false;
  isLoginState = false;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticate => {
        this.isAuthenticate = isAuthenticate;
      });
  }

}
