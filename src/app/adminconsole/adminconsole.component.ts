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
    this.imageService.getImages('slider').subscribe((data) => {
      console.log(data);
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
  }

  AddImageToSlider(url, description) {
    const dateNow = new Date();
    const dateNowISO = dateNow.toDateString();

    const newImage = {
      url: url,
      description: description,
      date: dateNowISO,
      index: 0,
      galleryId: 'slider',
    };
    this.imageservice.addImage(newImage).subscribe((data) => {
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
    this.imageservice.deleteImage(imageId).subscribe((data) => {
      // deletes images from array in frontend
      if (data.data.deleteImage === '1') {
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
      .updateImage(image['id'], updatedImage)
      .subscribe((data) => {
        if (data.data.updateImage != null) {
          alert('Görsel başarı ile güncellendi.');
        }
      });
  }

  // IMAGES IN GALLERIES CRUD OPS.=================

  AddImageToGallery(url, description, gallery) {
    const dateNow = new Date();
    const dateNowISO = dateNow.toDateString();

    const newImage = {
      url: url,
      description: description,
      date: dateNowISO,
      index: 0,
      galleryId: gallery.galleryInfo['id'],
    };

    this.imageservice.addImage(newImage).subscribe((data) => {
      const img = data.data.addImage;
      gallery.galleryImages = Object.assign([], gallery.galleryImages);
      gallery.galleryImages.push(img);
    });
  }

  GetImagesOnGalleries() {
    let galleryImages = [];
    this.galleryservice.getGalleryInfos().subscribe((data) => {
      this.allGalleries = data.data.getGalleryInfos;
      data.data.getGalleryInfos.map((galleryInfo) => {
        this.imageservice.getImages(galleryInfo['id']).subscribe((data) => {
          galleryImages = data.data.getImages;
          this.imagesOfGalleries.push({ galleryInfo, galleryImages });
        });
      });
    });
  }

  DeleteImageFromGalleries(gallery, image) {
    this.imageservice.deleteImage(image['id']).subscribe((data) => {
      // deletes images from array in frontend
      if (data.data.deleteImage === '1') {
        const deletedImg = gallery.galleryImages.find(
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

  UpdateImageInGallery(description, index, image) {
    const updatedImage = {
      description: description,
      index: index,
    };
    this.imageService
      .updateImage(image['id'], updatedImage)
      .subscribe((data) => {
        if (data.data.updateImage != null) {
          alert('Görsel başarı ile güncellendi.');
        }
      });
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
    this.galleryservice.addGallery(newGallery).subscribe((data) => {
      if (data) {
        this.allGalleries = Object.assign([], this.allGalleries);
        this.allGalleries.push(data.data.addGallery);
      }
    });
  }

  DeleteThisGallery(galleryInfo) {
    // deletes gallery from Galleries in DB
    this.galleryservice.deleteGallery(galleryInfo['id']).subscribe((data) => {
      if (data.data.deleteGallery === '1') {
        // deletes gallery from DOM

        const index = this.allGalleries.indexOf(galleryInfo);
        this.allGalleries = Object.assign([], this.allGalleries);
        this.allGalleries.splice(index, 1);
        // deletes images of the gallery from DOM
      } else {
        ('Silinme işlemi sırasında bir hata oluştu lütfen tekrar deneyiniz.');
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
      .updateGallery(gallery['id'], updatedGallery)
      .subscribe((data) => {
        if (data.data.updateGallery != null) {
          alert('Galeri başarı ile güncellendi.');
        }
      });
  }

  // creates user manually
  CreateUser() {}

  // toggle for deletings
  toggleWithGreeting(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
}
