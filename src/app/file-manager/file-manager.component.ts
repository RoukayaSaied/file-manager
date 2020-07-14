import {Component, OnInit} from '@angular/core';
import {FilesService} from '../core/services/files/files.service';
import * as fileSaver from 'file-saver';
import {Item} from "../core/models/Item";
import {AddFolderDialogComponent} from "./dialogs/add-folder-dialog/add-folder-dialog.component";
import {MatDialog, MatMenuTrigger} from "@angular/material";
import {ItemCreate} from "../core/models/ItemCreate";
import {UploadFileDialogComponent} from "./dialogs/upload-file-dialog/upload-file-dialog.component";
import {RenameItemDialogComponent} from "./dialogs/rename-item-dialog/rename-item-dialog.component";

@Component({
	selector: 'fl-file-manager',
	templateUrl: './file-manager.component.html',
	styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
	files: Item [];
	searchFile: Item;
	currentRoot: any;
	currentPath: string = '';
	canNavigateUp = false;
	folderAdded: ItemCreate;

	constructor(private filesService: FilesService,
				public dialog: MatDialog) {
	}

	ngOnInit() {
		this.folderAdded = {name: '', folder: false};
		this.findAllFiles();
	}

	findAllFiles() {
		this.filesService.getItemsList(this.currentRoot ? this.currentRoot.id : '')
			.subscribe(
				res => {
					this.files = res.items;
				}, error => {
					console.log(error);
				});
	}


	findFileById(id: any) {
		this.filesService.getItemById(id)
			.subscribe(
				res => {
					this.searchFile = res.items[0];
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
		this.filesService.createFolder(this.folderAdded, this.currentRoot ? this.currentRoot.id : '')
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

	openRenameDialog(element: Item) {
		let dialogRef = this.dialog.open(RenameItemDialogComponent);
		dialogRef.afterClosed()
			.subscribe(res => {
				if (res) {
					this.renameItem(element.id, res);
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

	navigateToFolder(element: Item) {
		if(element.folder){
			this.currentRoot = element;
			this.findAllFiles();
			this.currentPath =  this.currentPath + element.name + '/';
			this.canNavigateUp = true;
			console.log(this.currentRoot);
		}
	}

	navigateUp() {
		if (this.currentRoot && !this.currentRoot.parentId) {
			this.currentRoot = null;
			this.canNavigateUp = false;
			this.findAllFiles();
		} else {
			this.filesService.getItemById(this.currentRoot.parentId)
				.subscribe(
					res => {
						this.currentRoot = res.items[0];
						this.findAllFiles();
					}, error => {
						console.log(error);
					});
		}
		this.currentPath = this.popFromPath(this.currentPath);
	}

	popFromPath(path: string) {
		let p = path ? path : '';
		let split = p.split('/');
		split.splice(split.length - 2, 1);
		p = split.join('/');
		return p;
	}

	openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
		event.preventDefault();
		viewChild.openMenu();
	}


	renameItem(id: any, name: string) {
		this.filesService.renameItem(id, name)
			.subscribe(
				res => {
					console.log(res);
					this.findAllFiles();
				}, error => {
					console.log(error);
				});
	}

	moveItem( element: Item, moveTo: Item ) {
		this.filesService.moveItem(element.id, moveTo.id)
			.subscribe(
				res => {
					console.log(res);
					this.findAllFiles();
				}, error => {
					console.log(error);
				});
	}

	deleteItem(element: Item) {
		this.filesService.deleteItem(element.id)
			.subscribe(
				res => {
					console.log(res);
					this.findAllFiles();
				}, error => {
					console.log(error);
				});
	}
}
