import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_IMAGES = gql`
  query getImage($path: String) {
    getImages(path: $path) {
      id
      description
      date
      index
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  datas = [];

  constructor(public apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: GET_IMAGES,
        variables: {
          path: 'images/slider',
        },
      })
      .valueChanges.subscribe((data) => {
        this.datas.push(data.data.getImages);
      });
  }
}
