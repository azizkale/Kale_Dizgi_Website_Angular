import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const ADD_MESSAGE = gql`
  mutation addMessage($message: String!) {
    addMessage(message: $message) {
      name
      mail
      date
      message
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private apollo: Apollo) {}

  addMessage(message: object): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_MESSAGE,
      variables: {
        message: message,
      },
    });
  }
}
