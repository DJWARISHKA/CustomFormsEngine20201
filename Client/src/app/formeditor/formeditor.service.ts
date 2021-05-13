import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IForm } from "./form.js"
import { GlobalVariable } from '../global.js';


@Injectable({
  providedIn: 'root'
})
export class FormEditorService {
  constructor(private httpClient: HttpClient) { }

  url: string = GlobalVariable.BASE_API_URL + "/home/formeditor";

  get(form: IForm): Observable<IForm> {
    return this.httpClient.post<IForm>(`${this.url}/Get`, form);
  }

  delete(url: string): Observable<{}> {
    return this.httpClient.delete(`${this.url}/${url}`);
  }

  create(form: IForm) {
    return this.httpClient.post(`${this.url}/Create`, form);
  }

  change(form: IForm): Observable<IForm> {
    return this.httpClient.put<IForm>(`${this.url}`, form);
  }
}
