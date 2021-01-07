import { Component, OnInit } from '@angular/core';
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
  selector: 'app-dizgimizanpaj',
  templateUrl: './dizgimizanpaj.component.html',
  styleUrls: ['./dizgimizanpaj.component.css'],
})
export class DizgimizanpajComponent implements OnInit {
  constructor(public apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: GET_IMAGES,
        variables: {
          path: 'images/slider',
        },
      })
      .valueChanges.subscribe((data) => {
        console.log(data);
      });
  }
}
