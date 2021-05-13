import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-radiobox',
  templateUrl: './radiobox.component.html',
  styleUrls:['./radiobox.component.css']
})
export class RadioboxComponent implements OnInit {
  answerBody: any = {}
  selected:string;
  value: any;
  title: string;
  description: string;
  answers: string[];
  canEdit:boolean = true;
  constructor() {
  }

  ngOnInit(): void {
    this.answers = this.value.params[3][1].split('\n');
    this.title = this.value.params[0][1];
    this.description = this.value.params[1][1];
    if(this.value.answer!=undefined)
    {
      this.selected = this.value.answer.answer;
      this.canEdit = false;
    }

    this.answerBody.title = this.title;
    this.answerBody.description = this.description;
  }

  index: number = -1;
  changed() {
    this.answerBody.answer = this.selected;

    let obj = JSON.parse(localStorage.getItem('answers'));
    if (this.index == -1) {
      this.index = obj.answers.length;
      obj.answers.push(this.answerBody);
    }
    obj.answers[this.index] = this.answerBody;
    localStorage.setItem('answers', JSON.stringify(obj));
  }

  

}