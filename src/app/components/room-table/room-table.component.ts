import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { plus, cross } from '../../shared/icons';
import { Room } from '../../models/Room';

@Component({
  selector: 'app-room-table',
  templateUrl: './room-table.component.html',
  styleUrls: ['./room-table.component.css']
})
export class RoomTableComponent implements OnInit {

  list: Room[] = [];

  // icons
  addIcon = plus;
  deleteIcon = cross;


  constructor(
    private rs: RoomService
  ) { }

  ngOnInit(): void {
    this.rs.getAll().subscribe(res => this.list = res);
  }

  handleDelete(index) {
    let deletedRoom = (this.list.splice(index, 1))[0];
    this.rs.remove(deletedRoom.id).subscribe();
  }

}
