import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IForm } from "../formeditor/form.js";
import { GlobalVariable } from '../global.js';
import { Answer, Answers } from './answer.js';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  constructor(private httpClient: HttpClient) { }

  url: string = GlobalVariable.BASE_API_URL + "/home/answer";

  get(id: string): Observable<IForm> {
    return this.httpClient.post<IForm>(this.url, id);
  }

  delete(id: number): Observable<{}> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  create(answers: Answers) {
    return this.httpClient.post(this.url, answers);
  }

  change(answers: Answers) {
    return this.httpClient.put(this.url, answers);
  }
}
