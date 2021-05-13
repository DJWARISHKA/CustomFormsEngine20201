import { Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private guard:AuthGuard,public service:UserService,private router:Router,private toastr:ToastrService) { }
  formModel={
    Email:'',
    Password:''
  }
  ngOnInit(): void {
    
  }

  onSubmit(form:NgForm)
  {
    this.service.login(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/home/tables');
      },
      err=>{
        if(err.status = 400)
          this.toastr.error('Incorrect email address or password!','Authentication failed.');
        else
          console.log(err);
      }
    )
  }
}
