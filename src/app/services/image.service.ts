import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const GET_IMAGE = gql`
  query getImages($galleryID: String!) {
    getImages(galleryID: $galleryID) {
      id
      url
      description
      date
      index
      galleryId
    }
  }
`;
const ADD_IMAGE = gql`
  mutation addImage($image: String) {
    addImage(image: $image) {
      id
      url
      description
      date
      index
    }
  }
`;
const DELETE_IMAGE = gql`
  mutation deleteImage($path: String!, $id: ID!) {
    deleteImage(path: $path, id: $id)
  }
`;
const UPPDATE_IMAGE = gql`
  mutation updateImage($path: String!, $image: String!) {
    updateImage(path: $path, image: $image) {
      id
      description
      date
      index
      url
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(public apollo: Apollo) {}

  getImages(galleryID: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_IMAGE,
      variables: {
        galleryID: galleryID,
      },
    }).valueChanges;
  }

  addImage(image: object): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_IMAGE,
      variables: {
        image: JSON.stringify(image),
      },
    });
  }

  deleteImage(path: string, imageId: any): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_IMAGE,
      variables: {
        path: path,
        id: imageId,
      },
    });
  }

  updateImage(path: string, image: object): Observable<any> {
    return this.apollo.mutate({
      mutation: UPPDATE_IMAGE,
      variables: {
        path: path,
        image: JSON.stringify(image),
      },
    });
  }
}
