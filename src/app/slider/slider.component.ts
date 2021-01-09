import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  imageObject: Array<object> = [];

  constructor(public imageService: ImageService) {}

  ngOnInit() {
    this.GetSliderImages();
  }

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
        this.imageObject.push(obj);
      });
    });
  }
}
