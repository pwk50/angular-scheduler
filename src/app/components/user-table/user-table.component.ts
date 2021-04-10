import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { check, cross } from '../../shared/icons';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  list: User[] = [];

  // icons
  approveIcon = check;
  rejectIcon = cross;

  constructor(
    private us: UserService
  ) { }

  ngOnInit(): void {
    this.us.getPendingUsers().subscribe(res => this.list = res);
  }

  handleAction(action, user) {
    if (action === 'approve') {
      user.isApproved = true;
      this.us.updateUser(user).subscribe();
    } else {
      user.isApproved = false;
      this.us.updateUser(user).subscribe();
    }
  }

}
