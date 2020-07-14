import {Component, OnInit, } from '@angular/core';

@Component({
  selector: 'fl-add-folder-dialog',
  templateUrl: './add-folder-dialog.component.html',
  styleUrls: ['./add-folder-dialog.component.scss']
})
export class AddFolderDialogComponent implements OnInit {
	folderName: string;

	constructor() {}

	ngOnInit() {
  	}

}
