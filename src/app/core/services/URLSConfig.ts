import { environment } from '../../../environment';

const BASE_URL = `${environment.host}:${environment.port}${environment.prefix}`;

export const URLSConfig = {
	FOLDERS_AND_FILES: BASE_URL + '/items',

};
