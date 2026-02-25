import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  private userService = inject(UserService);

  ngOnInit(): void {
    this.refreshUsers();
  }

  refreshUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
