import { Route } from '@angular/compiler/src/core';
import { Component, ComponentFactoryResolver, ComponentRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IForm } from '../formeditor/form';
import { FormService } from '../formeditor/form.service';
import { FormEditorService } from '../formeditor/formeditor.service';
import { UserService } from '../user/user.service';
import { Answer, FormAnswer } from './answer';
import { CheckboxComponent } from './dynamic/box-answer/checkbox/checkbox.component';
import { ListboxComponent } from './dynamic/box-answer/listbox/listbox.component';
import { RadioboxComponent } from './dynamic/box-answer/radiobox/radiobox.component';
import { DateAnswerComponent } from './dynamic/date-answer/date-answer.component';
import { NumberAnswerComponent } from './dynamic/number-answer/number-answer.component';
import { TextAnswerComponent } from './dynamic/text-answer/text-answer.component';
import { TextLongAnswerComponent } from './dynamic/textlong-answer/textlong-answer.component';
import { TimeAnswerComponent } from './dynamic/time-answer/time-answer.component';
import { FormAnswerService } from './form-answer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.css']
})
export class FormAnswerComponent implements OnInit {
  @ViewChild('component', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  url: string;
  jsonObj;
  forms;
  answerObject: any = {
    answers: []
  };
  myAnswer;
  private subscription: Subscription;

  constructor(private activateRoute: ActivatedRoute,
    private service: FormEditorService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private answerService: FormAnswerService,
    private router: Router,
    private userService: UserService) {
    this.subscription = this.activateRoute.params.subscribe(params => this.url = params['url']);
    this.form.url = this.url;
    if (history.state.answerObj != undefined) {
      this.myAnswer = JSON.parse(history.state.answerObj.jsonAnswer).answers;
    }
    localStorage.setItem('answers', JSON.stringify(this.answerObject));
  }

  answer: Answer;

  saveAnswers() {
    let obj = JSON.parse(localStorage.getItem('answers'));
    this.answerObject.id = this.form.id;
    this.answerObject.answers = obj;
    this.answer = {
      formId: this.form.id,
      userId: '',
      answerDate: moment().format(),
      jsonAnswer: JSON.stringify(this.answerObject)
    }
    this.answerService.postAnswer(this.answer).subscribe(
      (res: any) => {
        this.router.navigateByUrl('home/tables');
      },
      err => {
        console.log(err);
      });
  }

  ngOnInit(): void {
    let user;
    this.userService.getUserProfile().subscribe(
      res => {
        user = res;
        this.service.get(this.form).subscribe(
          res => {
            this.form = res;
            this.jsonObj = JSON.parse(this.form.jform);
            this.forms = Object.values(this.jsonObj);
            console.log(this.forms);
            let i = 0;
            this.forms.forEach(form => {
              let ans;
              let formTitle = JSON.parse(form[1])[0][1];
              if (this.myAnswer != undefined) {

                for (let i = 0; i < this.myAnswer.answers.length; i++) {
                  if (this.myAnswer.answers[i].title == formTitle) {
                    ans = this.myAnswer.answers[i];
                    break;
                  }
                }
              }
              i++;
              this.addComponent(form, ans)
            })
          },
          err => {
            console.log(err);
          }
        )
      }
    );

  }

  addComponent(form, answer?) {
    let key = JSON.parse(form[1]);
    let componentType: Type<any> = this.resolve((key[0])[0]);
    let component = this.componentFactoryResolver.resolveComponentFactory(componentType);
    let componentRef = this.container.createComponent(component);

    (componentRef.instance).value = {
      params: key,
      answer: answer
    };
  }

  resolve(type: string): Type<any> {
    switch (type) {
      case "text":
        return TextAnswerComponent;
      case "longtext":
        return TextLongAnswerComponent;
      case "number":
        return NumberAnswerComponent;
      case "checkbox":
        return CheckboxComponent;
      case "radiobox":
        return RadioboxComponent;
      case "combobox":
        return ListboxComponent;
      case "date":
        return DateAnswerComponent;
      case "time":
        return TimeAnswerComponent;
      default:
        console.warn(`Unknown of type ${type}`);
    }
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

}
