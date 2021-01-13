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
  mutation deleteImage($id: ID!) {
    deleteImage(id: $id)
  }
`;
const UPPDATE_IMAGE = gql`
  mutation updateImage($id: ID!, $image: String!) {
    updateImage(id: $id, image: $image) {
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

  deleteImage(imageId: any): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_IMAGE,
      variables: {
        id: imageId,
      },
    });
  }

  updateImage(id: any, image: object): Observable<any> {
    return this.apollo.mutate({
      mutation: UPPDATE_IMAGE,
      variables: {
        id: id,
        image: JSON.stringify(image),
      },
    });
  }
}
