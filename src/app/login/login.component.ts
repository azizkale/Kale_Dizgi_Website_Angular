import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  LogIn(name, password) {
    //   this.auth
    //     .signInWithEmailAndPassword(name, password)
    //     .then(() => {
    //       alert('yetkili Girişi sağlandı.');
    //       this.router.navigate(['adminconsole']);
    //     })
    //     .catch(() => {
    //       alert('Yetkili girişi sağlanamadı.');
    //     });
  }
}
