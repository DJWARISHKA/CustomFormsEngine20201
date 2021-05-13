import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html'
})
export class TextAnswerComponent implements OnInit {
  answerBody: any = {}

  value: any;
  title: string;
  description: string;
  constructor() {

  }

  canEdit: boolean = true;
  ngOnInit(): void {
    this.title = this.value.params[0][1];
    this.description = this.value.params[1][1];
    if (this.value.answer != undefined) {
      this.answer = this.value.answer.answer;
      this.canEdit = false;
    }
    this.answerBody.title = this.title;
    this.answerBody.description = this.description;
  }

  answer: string;
  index: number = -1;
  changed() {
    this.answerBody.answer = this.answer;

    let obj = JSON.parse(localStorage.getItem('answers'));
    if (this.index == -1) {
      this.index = obj.answers.length;
      obj.answers.push(this.answerBody);
    }
    obj.answers[this.index] = this.answerBody;
    localStorage.setItem('answers', JSON.stringify(obj));
  }
}
