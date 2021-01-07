import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  imageObject: Array<object> = [];

  constructor() {}

  ngOnInit() {
    this.GetSliderImages();
  }

  GetSliderImages() {
    // this.serviceFireBase.GetSliderImages().pipe(take(1)).subscribe(img => {
    //   img.map(x => {
    //     var obj = {
    //       image: 'https://drive.google.com/uc?export=view&id=' + x.id,
    //       thumbImage: 'https://drive.google.com/uc?export=view&id=' + x.id,
    //       alt: x.description,
    //       title: x.description,
    //       date: x.date
    //     };
    //     this.imageObject.push(obj);
    //   })
    // });
  }
}
