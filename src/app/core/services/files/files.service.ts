import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { URLSConfig } from '../URLSConfig';
import {Observable} from 'rxjs';
import {Item} from "../../models/Item";

@Injectable({
	providedIn: 'root',
})
export class FilesService {

  	constructor(private http: HttpClient) { }

  	getFilesList() : Observable<any> {
		return this.http.get<Item[]>(URLSConfig.FOLDERS_AND_FILES);
	}

	uploadFolder(folder_name: any) : Observable<any> {
		return this.http.post<any[]>(URLSConfig.FOLDERS_AND_FILES, folder_name);
	}

	downloadFile(id: any) : Observable<any> {
		return this.http.get<any[]>(URLSConfig.FOLDERS_AND_FILES + '/' + id, { responseType: 'blob' as 'json' });
	}
}
