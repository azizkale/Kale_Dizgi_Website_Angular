import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-adminconsole',
  templateUrl: './adminconsole.component.html',
  styleUrls: ['./adminconsole.component.css'],
})
export class AdminconsoleComponent implements OnInit {
  // imagesSlider: Array<object> = [];

  allMessages: Array<object> = [];
  _loginControl: boolean;

  constructor(public commonservice: CommonService) {}

  ngOnInit(): void {
    this.getAllMessages();
    this._loginControl = true;
  }

  //Authentication=====================
  LogOut() {}

  // Messages ====================
  getAllMessages() {
    this.commonservice.getAllMessages().subscribe((data) => {
      data.data.getMessages.map((msg) => {
        this.allMessages.push(msg);
      });
    });
  }

  deleteMessage(id) {
    console.log('id: ' + id);
    this.commonservice.deleteMessage(id).subscribe((data) => {
      console.log(data);
    });
  }
  // creates user manually
  CreateUser() {}

  // toggle for deletings
  deletingPopoverToggle(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
}
