import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IForm } from "../formeditor/form.js"
import { GlobalVariable } from '../global.js';

@Injectable({
  providedIn: 'root'
})
export class ToFileService {
  constructor(private httpClient: HttpClient) { }

  url: string = GlobalVariable.BASE_API_URL + "/home/answerstofile";

  get(form: IForm): Observable<string[]> {
    return this.httpClient.post<string[]>(`${this.url}`, form);
  }
}
