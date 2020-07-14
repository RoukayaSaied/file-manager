import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fl-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.css']
})
export class UploadFileDialogComponent implements OnInit {
	url :any;
  constructor() { }

  ngOnInit() {
  }


  onSelectFile(event: any) {
  	if (event.target.files && event.target.files[0]) {
  		var reader = new FileReader();

  		reader.readAsDataURL(event.target.files[0]); // read file as data url

		reader.onload = (event) => { // called once readAsDataURL is completed
			//this.url = event.target.result;
			console.log(event);
		}
  	}
  }
}
