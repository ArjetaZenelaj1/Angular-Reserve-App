import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-seat-reserve',
  templateUrl: './seat-reserve.component.html',
  styleUrls: ['./seat-reserve.component.css']
})
export class SeatReserveComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  cols: number[] = [1, 2, 3, 4, 5, 6];
  vipSeats: string[] = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'];
  totalSeats!: number;
  taken: any = [];
  selected: string[] = [];
  errorMessage = '';

  ngOnInit(): void {
    this.getRandomTakenSeats()
  }

  getRandomTakenSeats() {
    this.totalSeats = this.cols.length * this.rows.length - 1;
    if (!this.totalSeats) {
      return
    }
    // Generating random seats from second row and random cols
    while (this.taken.length != 5) {
      let rowsAvailable = ['B', 'C', 'D', 'E', 'F'];
      let r = Math.floor(Math.random() * 6) + 1;
      let random = Math.floor(Math.random() * rowsAvailable.length) + 1;
      let element = rowsAvailable[random] + r;
      if (!this.taken.includes(element) && element) {
        this.taken.push(element);
      }
    }
  }
  getStatus(seatPos: string) {
    if (this.vipSeats.indexOf(seatPos) !== -1) {
      return 'vip-seats';
    } else if (this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
    else if (this.taken.indexOf(seatPos) !== -1) {
      return 'taken';
    }
    return
  }

  seatClicked(seatPos: string) {
    var index = this.selected.indexOf(seatPos);

    if (this.selected.length < 2) {
      if (index !== -1) {
        // seat already selected, remove
        this.selected.splice(index, 1)
      } else {
        //push to selected array only if it is not reserved
        if (this.vipSeats.indexOf(seatPos) === -1 && this.taken.indexOf(seatPos) === -1)
          this.selected.push(seatPos);
      }
    }
    else if (this.taken.indexOf(seatPos) === -1) {
      this.errorMessage = 'You cant reserve more than 2 seats';
    }
  }

  clearErrors() {
    this.errorMessage = ''
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { selected: this.selected },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
