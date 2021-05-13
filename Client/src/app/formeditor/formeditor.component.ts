import { Component, OnInit } from "@angular/core";
import { DynamicData } from "./dynamicData"
import { IForm } from "./form.js"
import { FormEditorService } from "./formeditor.service";
import { UserService } from '../user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { allowedNodeEnvironmentFlags } from "process";

/**
 * Use of the main component wherever necessary. And as an example below.
 */
@Component({
  selector: "app-formeditor",
  templateUrl: "./formeditor.component.html",
})
export class FormEditorComponent implements OnInit {
  constructor(private formEditorService: FormEditorService,
    private service: UserService,
    private toastr: ToastrService,
    private router: Router,
    private activeR: ActivatedRoute
  ) {
    this.elements = [
      "text",
      "longtext",
      "number",
      "checkbox",
      "radiobox",
      "combobox",
      "date",
      "time",
      "endpage"
    ];
    this.dynamics = [];
  }
  ngOnInit() {
    this.activeR.params.subscribe(params => {
      this.form.url = params['url'];
    }); //Get form url
    if (typeof (this.form.url) != 'undefined')
      if (this.form.url.length == 6) { //Length of hash
        this.formEditorService.get(this.form).subscribe(
          res => {
            this.form = Object.assign(res);
            this.dynamics = JSON.parse(this.form.jform);
          },
          err => {
            console.error(err);
            this.toastr.error("Ошибка доступа");
            //this.router.navigateByUrl('/home/tables');
          });
      }
  }
  count: number = 0;
  type: string;
  public dynamics: Array<DynamicData> = [];
  elements: string[] = [
    "text",
    "longtext",
    "number",
    "checkbox",
    "radiobox",
    "combobox",
    "date",
    "time",
    "endpage"
  ];
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
  names: string[] = [
    "Текст",
    "Длинный текст",
    "Число",
    "Несколько из списка",
    "Один из списка",
    "Раскрывающийся список",
    "Дата",
    "Время",
    "Конец страницы"
  ];

  onChange(data: DynamicData) {
    this.dynamics[data.index] = data;
  }
  onCopy(index: number) {
    this.dynamics.push(new DynamicData(this.dynamics[index]));
    //console.log(this.dynamics);
  }
  onDelete(index: number) {
    this.dynamics.splice(index, 1); //Delete element from array
  }

  onAdd() {
    //console.log(this.type);
    let el: DynamicData = new DynamicData();
    el.el_type = this.type;
    this.dynamics.push(el);
  }

  getAllValues() {
    for (let key in this.dynamics) { //questions validating
      if (key == 'undefined') break;
      if (this.dynamics[key].question == "" && this.dynamics[key].el_type != "endpage")
        return false;
    }
    this.form.jform = JSON.stringify(this.dynamics); //converting data to json
    //console.log(this.form.jform);
    return true;
  }

  onSave() {
    if (this.form.name == "") {
      this.toastr.error("Заполните обязательные поля");
      return;
    }
    if (this.dynamics.length == 0) {
      this.toastr.error("Отсуцтвуют вопросы");
      return;
    }
    if (!this.getAllValues()) {
      this.toastr.error("Заполните обязательные поля");
      return;
    }
    //console.log( this.form );
    if (this.form.template || typeof (this.form.url) == 'undefined')
      this.form.url = "";
    if (this.form.url.length == 6)
      this.formEditorService.change(this.form).subscribe((res: any) => {
        this.toastr.success("Форма сохранена");
        this.router.navigateByUrl('/home/tables');
      },
        err => {
          this.toastr.error("Ошибка сохранения формы");
          console.error(err);
          return;
        });
    else
      if (this.form.url.length != 6)
        this.formEditorService.create(this.form).subscribe((res: any) => {
          this.toastr.success("Форма сохранена");
          this.router.navigateByUrl('/home/tables');
        },
          err => {
            this.toastr.error("Ошибка сохранения формы");
            console.error(err);
            return;
          });
  }
  BEDate: boolean = false;
}
