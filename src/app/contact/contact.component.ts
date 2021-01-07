import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  angForm: FormGroup;
  constructor(public fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      mail: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  Submit(name, mail, message) {
    let dateNow = new Date();
    let dateNowISO = dateNow.toDateString();

    let obj = {
      gonderenIsim: name,
      mailAdress: mail,
      gondermeTarihi: dateNowISO,
      Message: message,
    };

    // this.serviceFireBase.SendMessageToDB(obj);
  }
}
