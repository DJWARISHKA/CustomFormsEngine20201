import { Component, OnInit } from '@angular/core';
import { Answer, FormAnswer } from '../form-answer/answer';
import { FormService } from '../formeditor/form.service';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

  constructor(private userService: UserService, private formService: FormService) { }

  answers: Answer[];
  forms: FormAnswer[];
  userInfo;
  answerDates: Date[];
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res: any) => {
        this.userInfo = res;
        this.answers = this.userInfo.answers;
        this.formService.getAnsweredForms(this.userInfo.id).subscribe(
          (res: any) => {
            this.forms = res;
            for (let i = 1; i < this.answers.length; i++) {
              this.forms[i].answerDate = this.answers[i].answerDate;
            }
          },
          (err) => console.log(err)
        )
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
