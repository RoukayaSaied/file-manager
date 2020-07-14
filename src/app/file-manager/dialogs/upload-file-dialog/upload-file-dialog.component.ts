import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fl-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {
	filename :any;
	file: any;
	formData: any;
  constructor() { }

  ngOnInit() {
  }


  onSelectFile(event: any) {
	  try {
		  const file = event.target.files[0];
		  const fReader = new FileReader()
		  fReader.readAsDataURL(file)

		  fReader.onloadend = (_event: any) => {
			  this.filename = file.name;
			  this.file = _event.target.result;
			  this.formData = new FormData();
			  this.formData.append('file', file, this.filename);
		  }

	  } catch (error) {
		  this.filename = null;
		  this.file = null;
		  console.log('no file was selected...');
	  }
  }
}
