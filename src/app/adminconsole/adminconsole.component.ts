import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { ImageService } from '../services/image.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-adminconsole',
  templateUrl: './adminconsole.component.html',
  styleUrls: ['./adminconsole.component.css'],
})
export class AdminconsoleComponent implements OnInit {
  imagesSlider: Array<object> = [];
  imagesOfGalleries: Array<any> = [];
  allGalleries: Array<object> = [];
  allMessages: Array<object> = [];

  _loginControl: boolean;
  shw: boolean;

  constructor(
    public imageservice: ImageService,
    public galleryservice: GalleryService,
    public imageService: ImageService,
    public commonservice: CommonService
  ) {}

  ngOnInit(): void {
    this.GetImagesOnGalleries();
    this.getAllMessages();
    this._loginControl = true;
    this.shw = true;
  }

  //Authentication=====================
  LogOut() {}

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

  // Messages ====================
  getAllMessages() {
    this.commonservice.getAllMessages().subscribe((data) => {
      data.data.getMessages.map((msg) => {
        this.allMessages.push(msg);
      });
    });
  }

  deleteMessage(id) {
    console.log('id: ' + id);
    this.commonservice.deleteMessage(id).subscribe((data) => {
      console.log(data);
    });
  }
  // creates user manually
  CreateUser() {}

  // toggle for deletings
  deletingPopoverToggle(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
}
