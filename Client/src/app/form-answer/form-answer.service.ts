import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';
@Injectable({
  providedIn: 'root'
})
export class FormAnswerService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = GlobalVariable.BASE_API_URL;

  postAnswer(body) {
    return this.http.post(this.BaseURI + '/answers', body);
  }

}
