import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagerComponent } from './file-manager.component';
import { FormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatDialogModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatToolbarModule,
	MatCardModule, MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FilesService} from "../core/services/files/files.service";
import { AddFolderDialogComponent } from './dialogs/add-folder-dialog/add-folder-dialog.component';
import { UploadFileDialogComponent } from './dialogs/upload-file-dialog/upload-file-dialog.component';

@NgModule({
  	declarations: [FileManagerComponent, AddFolderDialogComponent, UploadFileDialogComponent],
	entryComponents : [AddFolderDialogComponent, UploadFileDialogComponent],
  	imports: [
    	CommonModule,
		MatToolbarModule,
		FlexLayoutModule,
		MatIconModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		BrowserAnimationsModule,
		MatDialogModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatTooltipModule
  	],
	exports: [
		FileManagerComponent,
	],
	providers : [FilesService]
})
export class FileManagerModule { }
