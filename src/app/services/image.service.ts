import { Injectable, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, of } from 'rxjs';

const GET_IMAGE = gql`
  query getImages($path: String) {
    getImages(path: $path) {
      id
      description
      date
      index
    }
  }
`;
const ADD_IMAGE = gql`
  mutation addImage($path: String, $image: String) {
    addImage(path: $path, image: $image) {
      id
      description
      date
      index
    }
  }
`;
const ADD_GALLERY = gql`
  mutation addGallery($path: String!, $gallery: String!) {
    addGallery(path: $path, gallery: $gallery) {
      id
      backGroungImageUrl
      fontColor
      fontFamily
      fontSize
      galleryTitle
      googleFontLink
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(public apollo: Apollo) {}

  getImages(path: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_IMAGE,
      variables: {
        path: path,
      },
    }).valueChanges;
  }

  addImage(path: string, image: object) {
    this.apollo
      .mutate({
        mutation: ADD_IMAGE,
        variables: {
          path: path,
          image: JSON.stringify(image),
        },
      })
      .subscribe((data) => console.log(data));
  }

  addGallery(path: string, gallery: object) {
    this.apollo
      .mutate({
        mutation: ADD_GALLERY,
        variables: {
          path: path,
          gallery: JSON.stringify(gallery),
        },
      })
      .subscribe();
  }
}
