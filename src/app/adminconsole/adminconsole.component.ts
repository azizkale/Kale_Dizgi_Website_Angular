import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryService } from '../services/gallery.service';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';

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
  shw: boolean;

  constructor(
    private fb: FormBuilder,
    public imageservice: ImageService,
    public galleryservice: GalleryService,
    public imageService: ImageService,
    public router: Router
  ) {
    this.createNewGalleryForm();
  }

  ngOnInit(): void {
    this.GetGalleries();
    this.GetImagesOnGalleries();
    this.GetSliderImages();
    this._loginControl = true;
    this.shw = true;
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
  //Authentication=====================
  LogOut() {}

  // creates user manually
  CreateUser() {}

  GetSliderImages() {
    this.imageService.getImages('images/slider').subscribe((data) => {
      data.data.getImages.map((img) => {
        const obj = {
          image: img.url,
          thumbImage: img.url,
          alt: img.description,
          title: img.description,
          date: img.date,
        };
        this.imagesSlider.push(obj);
      });
    });
  }

  AddImageToSlider(url, description) {
    const dateNow = new Date();
    const dateNowISO = dateNow.toDateString();

    const newImage = {
      // id is generated in the server
      id: '',
      url: url,
      description: description,
      date: dateNowISO,
      index: 0,
    };
    this.imageservice.addImage('images/slider', newImage);
  }

  AddImageToGallery(url, description, gallery) {
    const dateNow = new Date();
    const dateNowISO = dateNow.toDateString();

    const newImage = {
      // id is generated in the server
      id: '',
      url: url,
      description: description,
      date: dateNowISO,
      index: 0,
    };
    this.imageservice.addImage(
      'images/Galleries/-MQYP5PLAqptirJZwAKb',
      newImage
    );
  }

  AddNewGallery(
    galleryTitle,
    fontlink,
    fontFamily,
    fontColor,
    fontSize,
    bgPhotoLink
  ) {
    const newGallery = {
      // id is generated in the server
      id: '',
      backGroungImageUrl: bgPhotoLink,
      fontColor: fontColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
      galleryTitle: galleryTitle,
      googleFontLink: fontlink,
    };
    this.galleryservice.addGallery('Galleries', newGallery);
  }

  GetGalleries() {
    this.galleryservice.getGalleryInfos().subscribe((data) => {
      this.allGalleries = data.data.getGalleryInfos;
      console.log(this.allGalleries);
    });
  }

  GetImagesOnGalleries() {
    let galleryName, galleryImages;

    this.galleryservice.getGalleryInfos().subscribe((data) => {
      this.allGalleries = data.data.getGalleryInfos;
      this.allGalleries.map((galleryInfo) => {
        this.imageservice
          .getImages('images/Galleries/' + galleryInfo['id'])
          .subscribe((gallery) => {
            galleryName = galleryInfo['galleryTitle'];
            galleryImages = [];
            gallery.data.getImages.map((image) => {
              galleryImages.push(image);
            });
            this.imagesOfGalleries.push({ galleryName, galleryImages });
          });
      });
    });
    console.log(this.imagesOfGalleries);
  }

  DeleteImageFromGalleries() {}
  UpdateImageInGallery() {}
}
