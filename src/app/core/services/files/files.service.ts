import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { URLSConfig } from '../URLSConfig';
import {Observable} from 'rxjs';
import {Item} from "../../models/Item";

@Injectable({
	providedIn: 'root',
})
export class FilesService {

  	constructor(private http: HttpClient) { }

	getItemsList(id?: any) : Observable<any> {
  		if(id) {
			const params = new HttpParams({fromString: 'parentId='+id});
			return this.http.get<Item[]>(URLSConfig.FOLDERS_AND_FILES, {params: params});
		}else{
			return this.http.get<Item[]>(URLSConfig.FOLDERS_AND_FILES);
		}
	}

	getItemById(id: any) : Observable<any> {
  		return this.http.get<Item[]>(URLSConfig.FOLDERS_AND_FILES + '/' + id + '/path');

	}

	renameItem(id: any, new_name: any) : Observable<any> {
		return this.http.patch<Item[]>(URLSConfig.FOLDERS_AND_FILES + '/' + id, {name: new_name});

	}

	moveItem(id: any, parent_id: any) : Observable<any> {
		return this.http.patch<Item[]>(URLSConfig.FOLDERS_AND_FILES + '/' + id, {parentId: parent_id});

	}

	deleteItem(id: any) : Observable<any> {
		return this.http.delete<any>(URLSConfig.FOLDERS_AND_FILES + '/' + id);

	}

	createFolder(folder_name: any, id?: any) : Observable<any> {
		if(id) {
			const params = new HttpParams({fromString: 'parentId='+id});
			return this.http.post<any[]>(URLSConfig.FOLDERS_AND_FILES, folder_name, {params: params});
		}else {
			return this.http.post<any[]>(URLSConfig.FOLDERS_AND_FILES, folder_name);
		}
	}

	uploadNewFile(file: File) : Observable<any> {
		return this.http.post<any[]>(URLSConfig.FOLDERS_AND_FILES, file);
	}

	downloadFile(id: any) : Observable<any> {
		return this.http.get<any[]>(URLSConfig.FOLDERS_AND_FILES + '/' + id, { responseType: 'blob' as 'json' });
	}


}
