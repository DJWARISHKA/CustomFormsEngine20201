import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html'
})
export class ListboxComponent implements OnInit {
  answerBody: any = {}

  value: any;
  title: string;
  description: string;
  answers: string[];
  checkedAnswer: string;
  canEdit:boolean = true;
  constructor() {
  }

  ngOnInit(): void {
    this.answers = this.value.params[3][1].split('\n');
    this.title = this.value.params[0][1];
    this.description = this.value.params[1][1];
    if( this.value.answer != undefined)
    {
      this.checkedAnswer = this.value.answer.answer;
      this.canEdit = false;
    }
    this.answerBody.title = this.value.params[0][1];
    this.answerBody.description = this.value.params[1][1];
  }

  index: number = -1;
  changed() {
    this.answerBody.answer = this.checkedAnswer;

    let obj = JSON.parse(localStorage.getItem('answers'));
    if (this.index == -1) {
      this.index = obj.answers.length;
      obj.answers.push(this.answerBody);
    }
    obj.answers[this.index] = this.answerBody;
    localStorage.setItem('answers', JSON.stringify(obj));
  }

}
