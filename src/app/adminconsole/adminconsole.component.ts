import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../services/image.service';

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

  _loginControl: true;

  constructor(private fb: FormBuilder, public imageservice: ImageService) {
    this.createNewGalleryForm();
  }

  ngOnInit(): void {
    this.GetImagesOnGalleries();
  }

  createNewGalleryForm() {
    this.newGalleryForm = this.fb.group({
      galleryTitle: ['', Validators.required],
      fontlink: ['', Validators.required],
      fontFamily: ['', Validators.required],
      fontColor: ['', Validators.required],
      fontSize: ['', Validators.required],
    });
  }

  GetImagesOnGalleries() {
    this.imageservice.getImages('images/Galleries').subscribe((data) => {
      data.data.getImages.map((img) => {
        const obj = {
          image: img.id,
          thumbImage: img.id,
          alt: img.description,
          title: img.description,
          date: img.date,
        };
        this.imagesOfGalleries.push(obj);
        console.log(this.imagesOfGalleries);
      });
    });
  }

  addImage(path, url, description) {
    const dateNow = new Date();
    const dateNowISO = dateNow.toDateString();

    const newImage = {
      id: url,
      description: description,
      date: dateNowISO,
      index: 0,
    };
    this.imageservice.addImage(path, newImage);
  }

  addNewGallery(
    galleryTitle,
    fontlink,
    fontFamily,
    fontColor,
    fontSize,
    bgPhotoLink
  ) {
    const newGallery = {
      galleryTitle: galleryTitle,
      fontlink: fontlink,
      fontFamily: fontFamily,
      fontColor: fontColor,
      fontSize: fontSize,
      bgPhotoLink: bgPhotoLink,
    };
    this.imageservice.addGallery('Galleries', newGallery);
  }
}
