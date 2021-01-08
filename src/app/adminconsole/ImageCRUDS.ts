import { Injectable } from '@angular/core';
import { Image } from '../models/modelImage';

@Injectable({
  providedIn: 'root',
})
export class ImageCRUDS {
  addImage(url, description): Image {
    const dateNow = new Date();
    const dateNowISO = dateNow.toDateString();

    const newImage = {
      // id is generated in the server
      id: '',
      description: description,
      date: dateNowISO,
      index: 0,
    };
    return newImage;
  }
}
