import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public commonservice: CommonService) {}

  ngOnInit(): void {}

  LogIn(mail, password) {
    this.commonservice.login(mail, password).subscribe((data) => {
      localStorage.setItem('token', data.data.login);
      console.log(localStorage.getItem('token'));
    });
  }
}
