import {Component, OnInit} from '@angular/core';
import {FilesService} from '../core/services/files/files.service';
import * as fileSaver from 'file-saver';
import {Item} from "../core/models/Item";
import {AddFolderDialogComponent} from "./dialogs/add-folder-dialog/add-folder-dialog.component";
import {MatDialog, MatMenuTrigger} from "@angular/material";
import {ItemCreate} from "../core/models/ItemCreate";
import {UploadFileDialogComponent} from "./dialogs/upload-file-dialog/upload-file-dialog.component";

@Component({
	selector: 'fl-file-manager',
	templateUrl: './file-manager.component.html',
	styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
	files: Item [];
	path = ""
	folderAdded: ItemCreate;

	constructor(private filesService: FilesService,
				public dialog: MatDialog) {
	}

	ngOnInit() {
		this.folderAdded = {name: '', folder: false};
		this.findAllFiles();
	}

	findAllFiles() {
		this.filesService.getFilesList()
			.subscribe(
				res => {
					this.files = res.items;
				}, error => {
					console.log(error);
				});
	}


	openNewFolderDialog() {
		let dialogRef = this.dialog.open(AddFolderDialogComponent);
		dialogRef.afterClosed()
			.subscribe(res => {
				if (res) {
					this.folderAdded = {
						name: res,
						folder: true
					}
					this.addNewFolder();
				}
			});
	}

	addNewFolder() {
		this.filesService.createFolder(this.folderAdded)
			.subscribe(
				res => {
					console.log(res);
					this.findAllFiles();
				}, error => {
					console.log(error);
				});
	}


	uploadNewFile(file: any) {
		this.filesService.uploadNewFile(file)
			.subscribe(
				res => {
					console.log(res);
					this.findAllFiles();
				}, error => {
					console.log(error);
				});
	}

	openNewFileDialog() {
		let dialogRef = this.dialog.open(UploadFileDialogComponent, {width: '300px'});
		dialogRef.afterClosed()
			.subscribe(res => {
				if (res) {
					this.uploadNewFile(res);

				}
			});

	}

	downloadElement(element: any) {
		this.filesService.downloadFile(element.id).subscribe(
			response => {
				fileSaver.saveAs(response, element.name);
			},
			error => console.log('Error downloading the file' + error),
			() => console.info('File downloaded successfully')
		);
	}

	navigate(element: any) {
		console.log(element);
	}

	openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
		event.preventDefault();
		viewChild.openMenu();
	}
}
