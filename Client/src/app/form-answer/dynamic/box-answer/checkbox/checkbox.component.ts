import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {

  answerBody: any = {}

  value: any;
  title: string;
  description: string;
  answers: string[];
  Answer: any = [];
  checkedAnswers: string[] = [];
  constructor() {
  }

  canEdit: boolean = true;
  ngOnInit(): void {
    this.answers = this.value.params[3][1].split('\n');
    this.title = this.value.params[0][1];
    this.description = this.value.params[1][1];

    this.answers.forEach(elem => {
      this.Answer.push({
        answer: elem,
        checked: false
      })
    })

    if (this.value.answer != undefined) {
      this.checkedAnswers = this.value.answer.answer;
      this.canEdit = false;
      this.checkAnswered();
    }

    this.answerBody.title = this.title;
    this.answerBody.description = this.description;
  }

  checkAnswered() {
    this.Answer.forEach(element => {
      if(this.checkedAnswers.indexOf(element.answer)!=-1)
      {
        element.checked = true;
      }
    });
  }

  index: number = -1;
  changed(ans: string) {
    const indexOf = this.checkedAnswers.indexOf(ans);
    if (indexOf == -1) {
      this.checkedAnswers.push(ans);
    } else {
      this.checkedAnswers.splice(indexOf, 1);
    }
    this.answerBody.answer = this.checkedAnswers;

    let obj = JSON.parse(localStorage.getItem('answers'));
    if (this.index == -1) {
      this.index = obj.answers.length;
      obj.answers.push(this.answerBody);
    }
    obj.answers[this.index] = this.answerBody;
    localStorage.setItem('answers', JSON.stringify(obj));
  }

}
