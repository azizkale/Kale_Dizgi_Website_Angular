import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
const GET_GALLERYINFOS = gql`
  query GetGalleryInfos {
    getGalleryInfos {
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
const DELETE_GALLERY = gql`
  mutation deleteGallery($path: String!, $id: ID!) {
    deleteGallery(path: $path, id: $id)
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

  getGalleryInfos(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_GALLERYINFOS,
    }).valueChanges;
  }

  deleteGallery(path: string, galleryId: any): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_GALLERY,
      variables: {
        path: path,
        id: galleryId,
      },
    });
  }
}
