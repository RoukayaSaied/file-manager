import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fl-rename-item-dialog',
  templateUrl: './rename-item-dialog.component.html',
  styleUrls: ['./rename-item-dialog.component.scss']
})
export class RenameItemDialogComponent implements OnInit {
  name: string;
  constructor() { }

  ngOnInit() {
  }

}
