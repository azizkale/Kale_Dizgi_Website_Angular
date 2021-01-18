import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public commonservice: CommonService, private router: Router) {}

  ngOnInit(): void {}

  LogIn(mail, password) {
    this.commonservice.login(mail, password).subscribe((data) => {
      localStorage.setItem('token', data.data.login);
      this.router.navigate(['adminconsole']);
    });
  }
}
