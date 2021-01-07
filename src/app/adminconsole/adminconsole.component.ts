import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminconsole',
  templateUrl: './adminconsole.component.html',
  styleUrls: ['./adminconsole.component.css'],
})
export class AdminconsoleComponent implements OnInit {
  imagesSlider: Array<object> = [];
  imagesOfGalleries: Array<any> = [];
  allGalleries: Array<object> = [];
  newGalleryForm: FormGroup;
  allMessages: Array<object>;

  _loginControl: boolean;

  constructor(private fb: FormBuilder) {
    this.createNewGalleryForm();
  }

  ngOnInit(): void {}

  createNewGalleryForm() {
    this.newGalleryForm = this.fb.group({
      galleryTitle: ['', Validators.required],
      fontlink: ['', Validators.required],
      fontFamily: ['', Validators.required],
      fontColor: ['', Validators.required],
      fontSize: ['', Validators.required],
    });
  }
}
