import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-galleriesinfoconsole',
  templateUrl: './galleriesinfoconsole.component.html',
  styleUrls: ['./galleriesinfoconsole.component.css'],
})
export class GalleriesinfoconsoleComponent implements OnInit {
  allGalleries: Array<object> = [];
  newGalleryForm: FormGroup;

  constructor(
    private galleryservice: GalleryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.GetGalleries();
    this.createNewGalleryForm();
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
  // GALLERIES CRUD OPS.
  GetGalleries() {
    this.galleryservice.getGalleryInfos().subscribe((data) => {
      this.allGalleries = data.data.getGalleryInfos;
    });
  }

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

  // toggle for deletings
  deletingPopoverToggle(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
}
