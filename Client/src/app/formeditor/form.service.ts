import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IForm } from "./form.js"
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private httpClient: HttpClient) { }

  url: string = GlobalVariable.BASE_API_URL + "/home/formeditor";

  getUserForms() {
    return this.httpClient.get(this.url);
  }

  get(id: number): Observable<IForm> {
    return this.httpClient.get<IForm>(this.url + '/' + id);
  }

  delete(id: number): Observable<{}> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  create(form: IForm): Observable<IForm> {
    return this.httpClient.post<IForm>(this.url, form);
  }

  change(form: IForm): Observable<IForm> {
    return this.httpClient.put<IForm>(this.url, { form });
  }

  getAnsweredForms(id: string): Observable<IForm[]> {
    return this.httpClient.get<IForm[]>(this.url + '/answered');
  }
}
