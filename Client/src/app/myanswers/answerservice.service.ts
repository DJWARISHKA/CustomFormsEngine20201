import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IForm } from '../formeditor/form';
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private httpClient: HttpClient) { }

  url: string = GlobalVariable.BASE_API_URL+'/answers';

  getUserAnswers(): Observable<IForm[]> {
    return this.httpClient.get<IForm[]>(this.url + "/useranswers");
  }

}
