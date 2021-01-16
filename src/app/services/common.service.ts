import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const ADD_MESSAGE = gql`
  mutation addMessage($messageObject: String!) {
    addMessage(messageObject: $messageObject) {
      name
      mail
      date
      message
    }
  }
`;
const GET_ALLMESSAGES = gql`
  query getMessages {
    getMessages {
      id
      name
      mail
      date
      message
    }
  }
`;
const DELETE_MESSAGE = gql`
  mutation deleteMessage($id: ID) {
    deleteMessage(id: $id)
  }
`;
const ADD_USER = gql`
  mutation addUser($user: String!) {
    addUser(user: $user) {
      userName
      mail
      password
    }
  }
`;
const LOGIN = gql`
  query login($mail: String!, $password: ID!) {
    login(mail: $mail, password: $password) {
      id
      userName
      mail
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
        messageObject: JSON.stringify(message),
      },
    });
  }

  getAllMessages(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_ALLMESSAGES,
    }).valueChanges;
  }

  deleteMessage(id: any): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_MESSAGE,
      variables: {
        id: id,
      },
    });
  }

  addUser(user: object): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_USER,
      variables: {
        user: JSON.stringify(user),
      },
    });
  }

  login(mail: string, password: any): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: LOGIN,
      variables: {
        mail: mail,
        password: password,
      },
    }).valueChanges;
  }
}
