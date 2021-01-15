import { Component, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/services/gallery.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-galleries-imagesconsole',
  templateUrl: './galleries-imagesconsole.component.html',
  styleUrls: ['./galleries-imagesconsole.component.css'],
})
export class GalleriesImagesconsoleComponent implements OnInit {
  imagesOfGalleries: Array<any> = [];
  allGalleries: Array<object> = [];

  constructor(
    private imageservice: ImageService,
    private galleryservice: GalleryService
  ) {}

  ngOnInit(): void {
    this.GetImagesOnGalleries();
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
    this.imageservice
      .updateImage(image['id'], updatedImage)
      .subscribe((data) => {
        if (data.data.updateImage != null) {
          alert('Görsel başarı ile güncellendi.');
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
