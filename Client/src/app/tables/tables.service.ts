import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMessage } from './message';
import { IForm } from '../formeditor/form';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  constructor(private httpClient: HttpClient) { }
  url: string = GlobalVariable.BASE_API_URL;

  send(message: IMessage) {
    return this.httpClient.post(`${this.url}/message`, message);
  }
}
