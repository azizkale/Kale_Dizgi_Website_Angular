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

  // SLİDER CRUD OPS.==========

  GetSliderImages() {
    this.imageService.getImages('images/slider').subscribe((data) => {
      data.data.getImages.map((img) => {
        const obj = {
          image: img.url,
          thumbImage: img.url,
          alt: img.description,
          title: img.description,
          date: img.date,
          index: img.index,
          id: img.id,
        };
        this.imagesSlider.push(obj);
      });
    });
    console.log(this.imagesSlider);
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
    this.imageservice.addImage('images/slider', newImage).subscribe((data) => {
      const img = data.data.addImage;
      const obj = {
        image: img.url,
        thumbImage: img.url,
        alt: img.description,
        title: img.description,
        date: img.date,
        index: img.index,
        id: img.id,
      };
      this.imagesSlider.push(obj);
    });
  }

  DeleteImagesOfSlider(imageId) {
    this.imageservice
      .deleteImage('images/slider/', imageId)
      .subscribe((data) => {
        // deletes images from array in frontend
        if (data.data.deleteImage) {
          const deletedImg = this.imagesSlider.find(
            (img) => img['id'] === imageId
          );
          const index = this.imagesSlider.indexOf(deletedImg);
          this.imagesSlider.splice(index, 1);
        } else {
          ('Silinme işlemi sırasında bir hata oluştu lütfen tekrar deneyiniz.');
        }
      });
  }

  UpdateSliderImages(title, index, image) {
    const updatedImage = {
      description: title,
      index: index,
    };
    this.imageService
      .updateImage('images/slider/' + image['id'], updatedImage)
      .subscribe((data) => {});
  }

  // IMAGES IN GALLERIES CRUD OPS.=================

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

    this.imageservice
      .addImage('images/Galleries/' + gallery.galleryInfo['id'], newImage)
      .subscribe((data) => {
        const img = data.data.addImage;
        gallery.galleryImages = Object.assign([], gallery.galleryImages);
        gallery.galleryImages.push(img);
      });
  }

  GetImagesOnGalleries() {
    let galleryImages;

    this.galleryservice.getGalleryInfos().subscribe((data) => {
      this.allGalleries = data.data.getGalleryInfos;
      this.allGalleries.map((galleryInfo) => {
        this.imageservice
          .getImages('images/Galleries/' + galleryInfo['id'])
          .subscribe((gallery) => {
            galleryImages = gallery.data.getImages;
            // gallery.data.getImages.map((image) => {
            //   galleryImages.push(image);
            // });
            this.imagesOfGalleries.push({ galleryInfo, galleryImages });
          });
      });
    });
    console.log(this.imagesOfGalleries);
  }

  DeleteImageFromGalleries(gallery, image) {
    this.imageservice
      .deleteImage(
        'images/Galleries/' + gallery.galleryInfo['id'] + '/',
        image['id']
      )
      .subscribe((data) => {
        // deletes images from array in frontend
        if (data.data.deleteImage) {
          const deletedImg = this.imagesSlider.find(
            (img) => img['id'] === image['id']
          );
          const index = gallery.galleryImages.indexOf(deletedImg);
          gallery.galleryImages = Object.assign([], gallery.galleryImages);
          gallery.galleryImages.splice(index, 1);
        } else {
          ('Silinme işlemi sırasında bir hata oluştu lütfen tekrar deneyiniz.');
        }
      });
  }

  UpdateImageInGallery(description, index, gallery, image) {
    const updatedImage = {
      description: description,
      index: index,
    };
    this.imageService
      .updateImage(
        'images/Galleries/' + gallery['id'] + '/' + image['id'],
        updatedImage
      )
      .subscribe((data) => {});
  }

  // GALLERIES CRUD OPS.

  AddNewGallery(
    galleryTitle,
    fontlink,
    fontFamily,
    fontColor,
    fontSize,
    bgPhotoLink
  ) {
    // id is generated in the server
    const newGallery = {
      id: '',
      backGroungImageUrl: bgPhotoLink,
      fontColor: fontColor,
      fontFamily: fontFamily,
      fontSize: fontSize,
      galleryTitle: galleryTitle,
      googleFontLink: fontlink,
    };
    this.galleryservice
      .addGallery('Galleries', newGallery)
      .subscribe((data) => {});
  }

  //Gallery Infos
  GetGalleries() {
    this.galleryservice.getGalleryInfos().subscribe((data) => {
      this.allGalleries = data.data.getGalleryInfos;
    });
  }

  DeleteThisGallery(gallery) {
    //deletes gallery from Galleries in DB
    this.galleryservice
      .deleteGallery('Galleries/', gallery['id'])
      .subscribe((data) => {
        if (data.data.deleteGallery) {
          // delete images of gallery in images node in DB
          this.galleryservice
            .deleteGallery('images/Galleries/', gallery['id'])
            .subscribe();
        }
      });
  }

  UpdateThisGallery(
    galeriadi,
    fontlink,
    yazikarakteri,
    renk,
    punto,
    photo,
    gallery
  ) {
    const updatedGallery = {
      backGroungImageUrl: photo,
      fontColor: renk,
      fontFamily: yazikarakteri,
      fontSize: punto,
      galleryTitle: galeriadi,
      googleFontLink: fontlink,
    };
    this.galleryservice
      .updateGallery('Galleries/' + gallery['id'], updatedGallery)
      .subscribe((data) => {});
  }

  // creates user manually
  CreateUser() {}
}
