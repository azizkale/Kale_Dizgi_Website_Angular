import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  angForm: FormGroup;
  constructor(public fb: FormBuilder, public commonservice: CommonService) {
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
      name: name,
      mail: mail,
      date: dateNowISO,
      message: message,
    };
    this.commonservice.addMessage(obj).subscribe();
  }
}
