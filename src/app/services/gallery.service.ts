import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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
export class GalleryService {
  constructor(public apollo: Apollo) {}

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
