import { Component } from "@angular/core";
import { IForm } from "../formeditor/form.js";
import { AnswerService } from "./answer.service";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicData } from "../formeditor/dynamicData";
import { Answer, Answers } from "./answer.js";


/**
 * Use of the main component wherever necessary. And as an example below.
 */
@Component({
  selector: "app-answer",
  templateUrl: "./answer.component.html",
})
export class AnswerComponent {
  constructor(private answerService: AnswerService,
    private toastr: ToastrService,
    private router: Router,
    private activeR: ActivatedRoute) { }

  ngOnInit() {
    this.activeR.params.subscribe(params => {
      this.form.url = params['url'];
    }); //Get form url
    this.answerService.get(this.form.url).subscribe(
      res => {
        this.form = Object.assign(res);
        this.dynamics = JSON.parse(this.form.jform);
        this.changePage("Старт");
      },
      err => {
        console.error(err);
        this.toastr.error("Ошибка доступа");
        //this.router.navigateByUrl('/home/tables');
      });
  }
  form: IForm = {
    id: null,
    name: "",
    description: "",
    s_date: null,
    e_date: null,
    jform: "",
    url: "",
    template: false,
    anonym: false,
    private: false,
    editing: false,
    one_answer: true,
    recapcha: false
  };
  answers: Answers;
  dynamics: Array<DynamicData> = [];

  onChange(data: DynamicData) {
    this.dynamics[data.index] = data;
    if (data.el_type == "endpage")
      this.changePage(data.answer);
  }
  changePage(go: string) {
    switch (go) {
      case "Старт": //Find first endpage and hide all after it
        let start = true;
        for (let i = 0; i < this.dynamics.length; i++) {
          this.dynamics[i].hidden = !start;
          if (this.dynamics[i].el_type == "endpage") {
            this.dynamics[i].answer = "Далее";
            start = false;
          }
        }
        break;
      case "Далее":
        let next = true;
        for (let i = 0; i < this.dynamics.length; i++) { //Hide all before endpage
          if (this.dynamics[i].answer == "Далее") { //Show all before next endpage
            this.dynamics[i].answer = "Назад";
            next = !next;
          }
          this.dynamics[i].hidden = next;
          if (next == false && this.dynamics[i].answer == "Далее")
            break;
        }
        break;
      case "Назад":
        let prev = true;
        for (let i = this.dynamics.length - 1; i >= 0; i++) { //Hide all after prevpage
          if (this.dynamics[i].answer == "Назад") { //Show all after previos prevpage
            this.dynamics[i].answer = "Далее";
            prev = !prev;
          }
          this.dynamics[i].hidden = prev;
          if (prev == false && this.dynamics[i].answer == "Назад")
            break;
        }
        break;
    }
  }
  getAnswers() {
    let answers = Array<Answer>();
    for (let key in this.dynamics) {
      if (key == 'undefined') break;
      if (this.dynamics[key].answer == "" && this.dynamics[key].required)
        return false;
      answers.push(new Answer(this.dynamics[key].index, this.dynamics[key].answer));
    }
    this.answers.jAnswer = JSON.stringify(answers);
    return true;
  }

  onSave() {
    if (this.getAnswers()) {
      this.toastr.error("Заполните обязательные поля");
      return;
    }
    //console.log( this.form );
    this.answerService.create(this.answers).subscribe((res: any) => {
      this.toastr.success("Ответ сохранен");
      this.router.navigateByUrl('/home/tables');
    },
      err => {
        this.toastr.error("Ошибка сохранения формы");
        console.error(err);
        return;
      });
    this.router.navigateByUrl('/home/tables');
  }
  BEDate: boolean = false;
}
