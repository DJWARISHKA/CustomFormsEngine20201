import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from "./app.component";
import { UserService } from "./user/user.service";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { RegistrationComponent } from "./user/registration/registration.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/auth.guard";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { SettingsComponent } from "./settings/settings.component";
import { TablesComponent } from "./tables/tables.component";
import { ReportsComponent } from "./reports/reports.component";
import { FooterComponent } from "./footer/footer.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { NgxdModule } from "@ngxd/core";
import { FormEditorComponent } from "./formeditor/formeditor.component";
import { DynamicElements } from "./formeditor/dynamic/dynamic.components";
import { FormAnswerComponent } from './form-answer/form-answer.component';
import { TextAnswerComponent } from './form-answer/dynamic/text-answer/text-answer.component';
import { TextLongAnswerComponent } from './form-answer/dynamic/textlong-answer/textlong-answer.component';
import { DateAnswerComponent } from './form-answer/dynamic/date-answer/date-answer.component';
import { NumberAnswerComponent } from './form-answer/dynamic/number-answer/number-answer.component';
import { TimeAnswerComponent } from './form-answer/dynamic/time-answer/time-answer.component';
import { CheckboxComponent } from './form-answer/dynamic/box-answer/checkbox/checkbox.component';
import { RadioboxComponent } from './form-answer/dynamic/box-answer/radiobox/radiobox.component';
import { ListboxComponent } from './form-answer/dynamic/box-answer/listbox/listbox.component';
import { MyanswersComponent } from './myanswers/myanswers.component';
import { ToFile } from "./tofile/toFile";


@NgModule({
  declarations: [
    NavMenuComponent,
    FooterComponent,
    TablesComponent,
    ReportsComponent,
    SettingsComponent,
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    FormEditorComponent,
    DynamicElements,
    FormAnswerComponent,
    TextAnswerComponent,
    TextLongAnswerComponent,
    DateAnswerComponent,
    NumberAnswerComponent,
    TimeAnswerComponent,
    CheckboxComponent,
    RadioboxComponent,
    ListboxComponent,
    MyanswersComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    MatCheckboxModule,
    MatRadioModule,
    ToastrModule.forRoot({
      progressBar: true,
      enableHtml: true,
    }),
    RouterModule.forRoot([
      { path: "", redirectTo: "home/tables", pathMatch: "full" },
      { path: "registration", component: RegistrationComponent },
      { path: "login", component: LoginComponent },
      { path: "formanswer/:url", component: FormAnswerComponent },
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          { path: "", redirectTo: "home/tables", pathMatch: "full" },
          { path: "tables", component: TablesComponent, canActivate: [AuthGuard], },
          { path: "reports", component: ReportsComponent, canActivate: [AuthGuard] },
          { path: "formeditor", component: FormEditorComponent, canActivate: [AuthGuard] },
          { path: "formeditor/:url", component: FormEditorComponent, canActivate: [AuthGuard] },
          { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
          { path: "myanswers", component: MyanswersComponent, canActivate: [AuthGuard] }
        ]
      },
      { path: "**", redirectTo: "/home/tables" }
    ]),
    NgbModule,
    NgxdModule
  ],
  exports: [RouterModule],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [DynamicElements],
  bootstrap: [AppComponent]
})
export class AppModule {
}
