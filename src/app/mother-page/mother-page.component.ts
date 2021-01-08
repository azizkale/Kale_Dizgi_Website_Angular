import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mother-page',
  templateUrl: './mother-page.component.html',
  styleUrls: ['./mother-page.component.css'],
})
export class MotherPageComponent implements OnInit {
  imageObject: Array<object> = [];
  allGalleries: Array<object> = [];
  imagesOfGalleries: any[] = [];

  constructor(private sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

  ngOnInit() {}
  GetScreenSizeForTheGalleries() {
    if (window.innerWidth > 400) return { width: 315, height: 450, space: 5 };
    else return { width: 210, height: 300, space: 5 };
  }
}
