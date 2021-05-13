import { Identifiers } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer, FormAnswer } from '../form-answer/answer';
import { FormService } from '../formeditor/form.service';
import { FormEditorService } from '../formeditor/formeditor.service';
import { UserService } from '../user/user.service';
import { AnswerService } from './answerservice.service';

@Component({
  selector: 'app-myanswers',
  templateUrl: './myanswers.component.html',
})
export class MyanswersComponent implements OnInit {

  constructor(private userService: UserService,
    private answerService: AnswerService,
    private router: Router,
    private formService: FormService) { }

  answers: Answer[];
  forms: FormAnswer[];
  userInfo;
  answerDates: Date[];
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userInfo = res;
        this.answerService.getUserAnswers().subscribe(res => {
          this.answers = res;
          this.formService.getAnsweredForms(this.userInfo.id).subscribe(
            (res: any) => {
              this.forms = res;
              for (let i = 0; i < this.answers.length; i++) {
                this.forms[i].answerDate = this.answers[i].answerDate;
              }
            },
            (err) => console.log(err)
          )
        }, err => console.log(err));
      },
      (err) => {
        console.log(err);
      }
    )
  }

  showAnswers(url, date) {
    let answer = this.answers.find(a => a.answerDate === date);
    this.router.navigate(['formanswer/' + url], { state: { answerObj: answer } });
  }

}
