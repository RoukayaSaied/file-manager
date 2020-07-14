import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FileManagerModule} from './file-manager/file-manager.module';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		FileManagerModule,
	],
	declarations: [
		AppComponent,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
