import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-sliderconsole',
  templateUrl: './sliderconsole.component.html',
  styleUrls: ['./sliderconsole.component.css'],
})
export class SliderconsoleComponent implements OnInit {
  imagesSlider: Array<object> = [];

  constructor(private imageservice: ImageService) {}

  ngOnInit(): void {
    this.GetSliderImages();
  }

  GetSliderImages() {
    this.imageservice.getImages('slider').subscribe((data) => {
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
