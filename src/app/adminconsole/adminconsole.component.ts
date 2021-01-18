import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public commonservice: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.getAllMessages();
    this._loginControl = true;
  }

  //Authentication=====================
  LogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

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
