import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IForm } from '../formeditor/form';
import { FormService } from '../formeditor/form.service';
import { UserService } from '../user/user.service';
import { TablesService } from './tables.service';
import { ToFile } from '../tofile/toFile';
import { IMessage } from './message';
import { FormEditorService } from '../formeditor/formeditor.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalVariable } from '../global';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  //styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  userDetails;
  emails: string;
  url: string;
  constructor(private router: Router, private toastr: ToastrService, private service: UserService, private formService: FormEditorService,
    private tablesService: TablesService, private toFile: ToFile) { }

  ngOnInit(): void {

  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  message: IMessage = {
    emails: "",
    title: "",
    text: ""
  };
  onSend() {
    this.message.emails = this.emails;
    this.message.title = "Приглашение на прохождение формы";
    this.message.text = "Приглашение на прохождение формы " + GlobalVariable.BASE_URL + "/formanswer/" + this.url;
    this.tablesService.send(this.message).subscribe(res => {
      this.message.text = "";
      this.message.emails = "";
      this.toastr.success("Приглашения отправлены");
    }, err => {
      console.error(err);
      this.toastr.error("Ошибка отправки сообщений");
    });
  }

  onXlsx(form: IForm) {
    this.toFile.saveXlsx(form);
  }
  onCsv(form: IForm) {
    this.toFile.saveCsv(form);
  }

  Delete(userForm: IForm) {
    this.formService.delete(userForm.url).subscribe((res) => {
      setTimeout(() => this.ngOnInit(), 1000);
    }, (err) => console.log(err));
  }

}
