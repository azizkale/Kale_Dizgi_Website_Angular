import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GalleryService } from '../services/gallery.service';
import { ImageService } from '../services/image.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-mother-page',
  templateUrl: './mother-page.component.html',
  styleUrls: ['./mother-page.component.css'],
})
export class MotherPageComponent implements OnInit {
  imageObject: Array<object> = [];
  allGalleries: Array<object> = [];
  imagesOfGalleries: any[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private imageservice: ImageService,
    private galleryservice: GalleryService
  ) {
    this.sanitizer = sanitizer;
  }

  ngOnInit() {
    this.GetImagesOnGalleries();
    this.GetScreenSizeForTheGalleries();
    this.GetGalleries();
  }

  GetGalleries() {
    this.galleryservice
      .getGalleryInfos()
      .pipe(take(1))
      .subscribe((data) => {
        let galleryArray = data.data.getGalleryInfos;
        galleryArray.map((gallery) => {
          var baslikCss = {
            color: gallery['fontColor'],
            'font-family': gallery['fontFamily'],
            'font-size': gallery['fontSize'] + 'px',
          };
          var baslikTitle = gallery['galleryTitle'];
          var backgroundCss = {
            'background-image': "url('" + gallery['backGroungImageUrl'] + "')",
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'cover',
            'border-radius': '5px',
          };

          var googleFontLink: any = this.sanitizer.bypassSecurityTrustResourceUrl(
            gallery['googleFontLink']
          );
          var arr = [baslikCss, baslikTitle, backgroundCss, googleFontLink];
          arr = Object.assign([], arr);
          this.allGalleries.push(arr);
        });
      });
    console.log(this.allGalleries);
  }

  GetImagesOnGalleries() {
    let arrayName;
    this.galleryservice.getGalleryInfos().subscribe((data) => {
      data.data.getGalleryInfos.map((galleryInfo) => {
        this.imageservice.getImages(galleryInfo['id']).subscribe((data) => {
          let images = data.data.getImages;
          let arr = [];
          images.map((img) => {
            let obj = {
              image: img.url,
              thumbImage: img.url,
              alt: img.description,
              title: img.description,
              date: img.date,
              id: img.id,
            };
            arr.push(obj);
          });
          this.imagesOfGalleries.push(arr);
        });
      });
    });
    console.log(this.imagesOfGalleries);
  }

  GetScreenSizeForTheGalleries() {
    if (window.innerWidth > 400) return { width: 315, height: 450, space: 5 };
    else return { width: 210, height: 300, space: 5 };
  }
}
