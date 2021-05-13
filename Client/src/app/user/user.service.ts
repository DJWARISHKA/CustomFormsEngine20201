import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GlobalVariable } from '../global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = GlobalVariable.BASE_API_URL;
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.ComparePasswords })
  })

  ComparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');

    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors)
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
  }

  register() {
    //if (this.formModel.value.Passwords.Password != this.formModel.value.Passwords.ConfirmPassword)
    //  return;
    var body = {
      UserName: this.formModel.value.UserName,
      FullName: this.formModel.value.FullName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
    }
    return this.http.post(this.BaseURI + '/user/register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/user/login', formData);
  }


  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }
}

